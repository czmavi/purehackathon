import { CrudConnection, CONNECTION_NAME } from "./crud";
import { ObjectId } from "mongodb";
import { Group } from "../model/group";

export class GroupConnection extends CrudConnection<Group> {
    collectionName = CONNECTION_NAME.groups;

    get = async (filter: any = {}): Promise<Group[]> => {
        const authorizedFilter = {
            ...filter,
        };
        if (this.connectedEntity.device) {
            authorizedFilter._id = new ObjectId(this.connectedEntity.device.groupId);
        } else  {
            if (this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
                // No filter adjustments
            } else {
                const role = this.connectedEntity.user?.roles.find(r => r.companyId);
                if (role) {
                    authorizedFilter.companyId = role.companyId;
                } else {
                    throw Error(`Unauthorized to get entities ${this.collectionName}`);
                }
            }
        }

        return await this.getConnection().find(authorizedFilter).toArray();
    }

    getById = async (id: string): Promise<Group | null> => {
        const item = await this.getByIdNoAuth(id);
        if (this.connectedEntity.device) {
            if (this.connectedEntity.device.groupId !== id) {
                throw Error(`Not allowed to get entity _id ${id}`);
            }
        } else if (!this.connectedEntity.user) {
            throw Error(`Not allowed to get entity _id ${id}`);
        } else if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
            if (!this.connectedEntity.user?.roles.some(r => r.companyId === item?.companyId)) {
                throw Error(`Not allowed to get entity _id ${id}`);
            }
        }

        return item;
    }

    update = async (item: Partial<Group>): Promise<void> => {
        const { _id, ...update } = item;

        if (!_id) {
            throw Error('Cannot update without _id');
        }

        if (this.connectedEntity.device || !this.connectedEntity.user) {
            throw Error(`Not allowed to update entity _id ${_id}`);
        }

        if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
            if (!this.connectedEntity.user.roles.some(r => r.type === 'admin' && r.companyId === item.companyId)) {
                throw Error(`Not allowed to update entity _id ${_id}`);
            }

            if ('companyId' in update) {
                delete update.companyId;
            }
        }

        const result = await this.getConnection().updateOne({ _id: new ObjectId(_id) }, { $set: update });
    }

    delete = async (id: string): Promise<void> => {
        if (this.connectedEntity.device || !this.connectedEntity.user) {
            throw Error(`Not allowed to delete entity _id ${id}`);
        } else if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
            const item = await this.getByIdNoAuth(id);
            if (!this.connectedEntity.user.roles.some(r => r.type === 'admin' && r.companyId === item?.companyId)) {
                throw Error(`Not allowed to delete entity _id ${id}`);
            }
        }

        await this.getConnection().deleteOne({ _id: id });
    }
}

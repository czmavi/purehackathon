import { CrudConnection, CONNECTION_NAME } from "./crud";
import { ObjectId } from "mongodb";
import { User } from "../model/user";

export class UserConnection extends CrudConnection<User> {
    collectionName = CONNECTION_NAME.users;

    get = async (filter: any = {}): Promise<User[]> => {
        const authorizedFilter = {
            ...filter,
        };
        if (this.connectedEntity.device) {
            throw Error(`Unauthorized to get entities ${this.collectionName}`);
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

    getById = async (id: string): Promise<User | null> => {
        if (this.connectedEntity.device || !this.connectedEntity.user) {
            throw Error(`Not allowed to get entity _id ${id}`);
        }
        const item = await this.getByIdNoAuth(id);

        if (item === null) {
            return null;
        }

        if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin') &&
            !this.connectedEntity.user.roles.some(r => r.companyId === item.companyId)) {
            throw Error(`Not allowed to get entity _id ${id}`);
        }

        return item;
    }

    update = async (item: Partial<User>): Promise<void> => {
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

            // Company admins can only only update their own company roles atm
            if (update.roles && update.roles.some(r => r.companyId !== this.connectedEntity.user?.companyId)) {
                const originalItem = await this.getByIdNoAuth(_id);

                update.roles = [
                    ...originalItem?.roles.filter(r => r.companyId !== originalItem.companyId) || [],
                    ...update.roles.filter(r => r.companyId === originalItem?.companyId),
                ];
            }
        }

        const result = await this.getConnection().updateOne({ _id: new ObjectId(_id) }, { $set: update });
    }

    delete = async (id: string): Promise<void> => {
        if (this.connectedEntity.device || !this.connectedEntity.user) {
            throw Error(`Not allowed to delete entity _id ${id}`);
        } else if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
            if (id === this.connectedEntity.user._id) {
                throw Error('Cannot delete self');
            }
            const item = await this.getByIdNoAuth(id);
            if (!this.connectedEntity.user.roles.some(r => r.type === 'admin' && r.companyId === item?.companyId)) {
                throw Error(`Not allowed to delete entity _id ${id}`);
            }
        }

        await this.getConnection().deleteOne({ _id: id });
    }
}

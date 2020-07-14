import { CrudConnection, CONNECTION_NAME } from "./crud";
import { Device } from "../model/device";
import { ObjectId } from "mongodb";

export class DeviceConnection extends CrudConnection<Device> {
    collectionName = CONNECTION_NAME.devices;

    get = async (filter: any = {}): Promise<Device[]> => {
        const authorizedFilter = {
            ...filter,
        };
        if (this.connectedEntity.device) {
            authorizedFilter._id = new ObjectId(this.connectedEntity.device._id); 
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

    getById = async (id: string): Promise<Device | null> => {
        const item = await this.getByIdNoAuth(id);

        if (item === null) {
            return null;
        }

        if (this.connectedEntity.device?._id !== id
            && !this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {  
                if (!this.connectedEntity.user
                    || !this.connectedEntity.user.roles.some(r => r.companyId === item.companyId)) {
                        throw Error(`Not allowed to get entity _id ${id}`);
                }
        }
        return item;
    }

    update = async (item: Partial<Device>): Promise<void> => {
        if (!item._id) {
            throw Error('Cannot update without _id');
        }

        const { _id, ...update } = item;

        if (this.connectedEntity.device?._id !== _id
            || !this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
                const currentItem = await this.getByIdNoAuth(_id);
                
                if (!this.connectedEntity.user
                    || !this.connectedEntity.user.roles.some(r => r.type === 'admin' && r.companyId === currentItem?.companyId)) {
                        throw Error(`Not allowed to update entity _id ${_id}`);
                }
        }

        update.lastUpdated = new Date();

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

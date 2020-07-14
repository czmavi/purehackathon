import { CrudConnection, CONNECTION_NAME } from "./crud";
import { ObjectId } from "mongodb";
import { Company } from "../model/company";

export class CompanyConnection extends CrudConnection<Company> {
    collectionName = CONNECTION_NAME.companies;

    get = async (filter: any = {}): Promise<Company[]> => {
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
                    authorizedFilter._id = new ObjectId(role.companyId);
                } else {
                    throw Error(`Unauthorized to get entities ${this.collectionName}`);
                }
            }
        }

        return await this.getConnection().find(authorizedFilter).toArray();
    }

    getById = async (id: string): Promise<Company | null> => {
        if (this.connectedEntity.device || !this.connectedEntity.user) {
            throw Error(`Not allowed to get entity _id ${id}`);
        }
        const item = await this.getByIdNoAuth(id);

        if (item === null) {
            return null;
        }

        if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin') &&
            !this.connectedEntity.user.roles.some(r => r.companyId === item._id)) {
            throw Error(`Not allowed to get entity _id ${id}`);
        }

        return item;
    }

    update = async (item: Partial<Company>): Promise<void> => {
        const { _id, ...update } = item;

        if (!_id) {
            throw Error('Cannot update without _id');
        }

        if (this.connectedEntity.device || !this.connectedEntity.user) {
            throw Error(`Not allowed to update entity _id ${_id}`);
        }

        if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
            throw Error(`Not allowed to update entity _id ${_id}`);
        }

        const result = await this.getConnection().updateOne({ _id: new ObjectId(_id) }, { $set: update });
    }

    delete = async (id: string): Promise<void> => {
        if (!this.connectedEntity.user?.roles.some(r => r.type === 'superadmin')) {
            throw Error(`Not allowed to delete entity _id ${id}`);
        }

        await this.getConnection().deleteOne({ _id: id });
    }
}

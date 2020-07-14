import { MongoClient, ObjectId } from "mongodb";
import { ConnectedEntity } from "../model/connectedEntity";

export enum CONNECTION_NAME {
    companies = 'companies',
    devices = 'devices',
    groups = 'groups',
    tasks = 'tasks',
    users = 'users',
}

export abstract class CrudConnection<T> {
    protected dbName = 'mvich';
    protected abstract collectionName: keyof typeof CONNECTION_NAME;

    constructor(private client: MongoClient, protected connectedEntity: ConnectedEntity) {
    }

    getConnection = () => this.client.db(this.dbName).collection(this.collectionName);

    protected getByIdNoAuth = async (id: string): Promise<T | null> => {
        const result = await this.getConnection().findOne({ _id: new ObjectId(id)});

        if (result) {
            return result as T;
        }

        return null;
    }

    abstract get: (filter: any) => Promise<T[]>

    delete = async (id: string): Promise<void> => {
        await this.getConnection().deleteOne({ _id: id });
    }

    abstract update: (item: Partial<T>) => Promise<void>
}

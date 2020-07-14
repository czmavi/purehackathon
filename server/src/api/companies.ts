import { Express } from 'express';
import { MongoClient } from 'mongodb';
import { connectedEntity } from './connectedEntity';
import { CompanyConnection } from '../data/companyConnection';
import { MONGO_CONNECTION_STRING } from './consts';

export const bindCompanies = (app: Express) => {
    app.get('/api/companies', async (_, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new CompanyConnection(client, connectedEntity);
        const items = await connection.get();
        await client.close();
        return res.send({ items, total: items.length });
    });
    app.get('/api/companies/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new CompanyConnection(client, connectedEntity);
        const { id } = req.params;
        const item = await connection.getById(id);
        await client.close();
        return res.send(item);
    });
    app.patch('/api/companies/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new CompanyConnection(client, connectedEntity);
        const { id } = req.params;
        const item = {
            _id: id,
            ...req.body,
        };
        await connection.update(item);
        await client.close();
        return res.send();
    });
    app.delete('/api/companies/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new CompanyConnection(client, connectedEntity);
        const { id } = req.params;
        await connection.delete(id);
        await client.close();
        return res.send();
    });
}
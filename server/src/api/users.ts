import { Express } from 'express';
import { MongoClient } from 'mongodb';
import { UserConnection } from '../data/userConnection';
import { connectedEntity } from './connectedEntity';
import { MONGO_CONNECTION_STRING } from './consts';

export const bindUsers = (app: Express) => {
    app.get('/api/users', async (_, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new UserConnection(client, connectedEntity);
        const items = await connection.get();
        await client.close();
        return res.send({ items, total: items.length });
    });
    app.get('/api/users/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new UserConnection(client, connectedEntity);
        const { id } = req.params;
        const item = await connection.getById(id);
        await client.close();
        return res.send(item);
    });
    app.patch('/api/users/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new UserConnection(client, connectedEntity);
        const { id } = req.params;
        const item = {
            _id: id,
            ...req.body,
        };
        await connection.update(item);
        await client.close();
        return res.send();
    });
    app.delete('/api/users/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new UserConnection(client, connectedEntity);
        const { id } = req.params;
        await connection.delete(id);
        await client.close();
        return res.send();
    });
}
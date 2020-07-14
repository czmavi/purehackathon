import { Express } from 'express';
import { MongoClient } from 'mongodb';
import { connectedEntity } from './connectedEntity';
import { DeviceConnection } from '../data/deviceConnection';
import { MONGO_CONNECTION_STRING } from './consts';

export const bindDevices = (app: Express) => {
    app.get('/api/devices', async (_, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new DeviceConnection(client, connectedEntity);
        const items = await connection.get();
        await client.close();
        return res.send({ items, total: items.length });
    });
    app.get('/api/devices/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new DeviceConnection(client, connectedEntity);
        const { id } = req.params;
        const item = await connection.getById(id);
        await client.close();
        return res.send(item);
    });
    app.patch('/api/devices/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new DeviceConnection(client, connectedEntity);
        const { id } = req.params;
        const item = {
            _id: id,
            ...req.body,
        };
        await connection.update(item);
        await client.close();
        return res.send();
    });
    app.delete('/devices/:id', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new DeviceConnection(client, connectedEntity);
        const { id } = req.params;
        await connection.delete(id);
        await client.close();
        return res.send();
    });
}
import { Express } from 'express';
import { MongoClient } from 'mongodb';
import * as jwt from 'jsonwebtoken';
import { connectedEntity } from './connectedEntity';
import { DeviceConnection } from '../data/deviceConnection';
import { UserConnection } from '../data/userConnection';
import { ConnectedEntity } from '../model/connectedEntity';
import { JWT_SECRET, MONGO_CONNECTION_STRING } from './consts';

export const bindAuth = (app: Express) => {
    app.post('/api/auth/device', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new DeviceConnection(client, connectedEntity);
        const items = await connection.get({ deviceId: req.body.deviceId });
        await client.close();
        if (items.length !== 1) {
            return res.status(403).send('Entity not found');
        }
        const newConnectedEntity: ConnectedEntity = {
            device: {
                ...items[0],
            }
        };
        const token = jwt.sign(newConnectedEntity, JWT_SECRET, {
            expiresIn : 15 * 24 * 60 * 60 * 1000,
        });
        return res.send({ token, validUntil: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000) });
    });
    app.post('/api/auth/user', async (req, res) => {
        const client = new MongoClient(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const connection = new UserConnection(client, connectedEntity);
        const users = await connection.get({ email: req.body.email });
        await client.close();
        if (users.length !== 1) {
            return res.status(403).send('Entity not found');
        }
        const newConnectedEntity: ConnectedEntity = {
            user: {
                ...users[0],
            }
        };
        const token = jwt.sign(newConnectedEntity, JWT_SECRET, {
            expiresIn : 15 * 24 * 60 * 60 * 1000,
        });
        return res.send({ token, validUntil: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000) });
    });
}
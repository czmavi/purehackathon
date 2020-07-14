import { Express } from 'express';
import { bindUsers } from './users';
import { bindDevices } from './devices';
import { bindGroups } from './groups';
import { bindCompanies } from './companies';
import { bindAuth } from './auth';


export const bindApiToServer = (app: Express) => {
    bindUsers(app);
    bindDevices(app);
    bindGroups(app);
    bindCompanies(app);
    bindAuth(app);
};

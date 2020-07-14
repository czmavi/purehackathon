import { RoleType } from "../model/role";
import { ConnectedEntity } from "../model/connectedEntity";

export const connectedEntity: ConnectedEntity = {
    user: {
        _id: '5eff14e467b4bcb6ec453133',
        companyId: '5eff1acd67b4bcb6ec453137',
        email: 'mail@martinvich.net',
        firstName: 'Martin',
        lastLoggedIn: new Date(),
        lastName: 'Vích',
        roles: [{
            type: RoleType.superadmin,
        }],
    }
}

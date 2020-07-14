export enum RoleType {
    superadmin = 'superadmin',
    admin = 'admin',
    user = 'user'
}

export interface Role {
    type: RoleType
    companyId?: string
}

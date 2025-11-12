import { Role } from '../generated/prisma/index.js';

const allRoles = {
    [Role.USER]: ['getDashboard'],
    [Role.ADMIN]: ['getUsers', 'manageUsers', 'getDashboard']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));

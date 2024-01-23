import { RouteOptions } from 'fastify';
import { fetchAllAdminsRoute } from './list';
import { createAdminRoute } from './create';


export const adminsRoutes: RouteOptions[] = [
    fetchAllAdminsRoute,
    createAdminRoute
];
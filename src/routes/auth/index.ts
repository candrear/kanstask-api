
import { RouteOptions } from 'fastify';
import { loginRoute } from './login';
import { getOneAdminRoute } from './get-by-id';

export const authRoutes: RouteOptions[] = [
    loginRoute,
    getOneAdminRoute
];

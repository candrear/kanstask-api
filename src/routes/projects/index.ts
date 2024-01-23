import { RouteOptions } from 'fastify';
import { fetchAllProjectsRoute } from './list';
import { createProjectRoute } from './create';
import { deleteProjectRoute } from './delete';
import { getProjectByIdRoute } from './get-by-id';

export const projectsRoutes: RouteOptions[] = [
    fetchAllProjectsRoute,
    createProjectRoute,
    deleteProjectRoute,
    getProjectByIdRoute
];
import { RouteOptions } from 'fastify';
import { fetchAllIssuesRoute } from './list';
import { createIssueRoute } from './create';
import { updateIssueRoute } from './update';
import { getIssueByIdRoute } from './get-by-id';
import { deleteIssueRoute } from './delete';
import { getIssueByProjectIdRoute } from './get-by-project';

export const issuesRoutes: RouteOptions[] = [
    fetchAllIssuesRoute,
    createIssueRoute,
    updateIssueRoute,
    getIssueByIdRoute,
    deleteIssueRoute,
    getIssueByProjectIdRoute
];
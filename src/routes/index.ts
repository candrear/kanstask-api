import { FastifyInstance, RouteOptions } from "fastify";
import { projectsRoutes } from "./projects";
import { issuesRoutes } from "./issues";
import { adminsRoutes } from "./admins";
import { authRoutes } from "./auth";

const routes: RouteOptions[] = [
  ...projectsRoutes,
  ...issuesRoutes,
  ...adminsRoutes,
  ...authRoutes,
];

export const registerRoutes = (fastify: FastifyInstance) => {
  // console.warn('registering routes', routes);
  routes.map((route) => {
    fastify.route(route);
  });
};

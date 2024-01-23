import { getAllProjects, verifyToken } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

export const fetchAllProjectsRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/projects",
  verifyToken,
  async (request, reply) => {
    const projects = await getAllProjects({});
    return reply.header("x-data-source", "HIT").code(200).send(projects);
  }
);

import { deleteProject, verifyToken } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

export const deleteProjectRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/projects/:uuid/delete",
  verifyToken,
  async (request, reply) => {
    const { params } = request;
    const { uuid } = params as { uuid: string };
    const project = await deleteProject(uuid);
    return reply.status(201).send(project);
  }
);

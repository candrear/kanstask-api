import { getProjectById, verifyToken } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

export const getProjectByIdRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/projects/:uuid/one",
  verifyToken,
  async (request, reply) => {
    const { params } = request;
    const { uuid } = params as { uuid: string };
    const project = await getProjectById(uuid);
    return reply.header("x-data-source", "HIT").code(200).send(project);
  }
);

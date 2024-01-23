import { updateProject, verifyToken } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";
import { UpdateProjectDto } from "../../entities";

export const updateProjectRoute = makeFastifyRoute(
  RouteMethod.PATCH,
  "/projects",
  verifyToken,
  async (request, reply) => {
    const { body } = request;
    const data = body as UpdateProjectDto;
    const project = await updateProject(data);
    return reply.status(201).send(project);
  }
);

import { createProject, verifyToken } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";
import { CreateProjectDto } from "../../entities";

export const createProjectRoute = makeFastifyRoute(
  RouteMethod.POST,
  "/projects",
  verifyToken,
  async (request, reply) => {
    const { body } = request;
    const data = body as CreateProjectDto;
    const project = await createProject(data);
    return reply.status(201).send(project);
  }
);

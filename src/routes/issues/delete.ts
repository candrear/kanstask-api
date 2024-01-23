import { deleteIssue } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

const verify = async () => {};
export const deleteIssueRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/issues/:uuid/delete",
  verify,
  async (request, reply) => {
    const { params } = request;
    const { uuid } = params as { uuid: string };

    const project = await deleteIssue(uuid);
    return reply.status(201).send(project);
  }
);

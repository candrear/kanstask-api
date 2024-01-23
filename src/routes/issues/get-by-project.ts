import { getIssueByProjectId } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

const verify = async () => {};
export const getIssueByProjectIdRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/issues/:uuid/project",
  verify,
  async (request, reply) => {
    const { params } = request;
    const { uuid } = params as { uuid: string };
    const issue = await getIssueByProjectId(uuid);
    return reply.header("x-data-source", "HIT").code(200).send(issue);
  }
);

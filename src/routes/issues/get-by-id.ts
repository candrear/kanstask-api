import { getIssueById } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

const verify = async () => {};
export const getIssueByIdRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/issues/:uuid/one",
  verify,
  async (request, reply) => {
    const { params } = request;
    const { uuid } = params as { uuid: string };
    const issue = await getIssueById(uuid);
    return reply.header("x-data-source", "HIT").code(200).send(issue);
  }
);

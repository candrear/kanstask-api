import { getAllIssues } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";
import { StatusType } from "../../entities";

const verify = async () => {};

interface Query {
  page: number;
  limit: number;
  status: StatusType;
}

export const fetchAllIssuesRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/issues/:uuid",
  verify,
  async (request, reply) => {
    const { params } = request;
    const { uuid } = params as { uuid: string };
    const { query } = request;
    const { page, limit, status } = query as Query;

    const issues = await getAllIssues({ uuid, limit });
    return reply.header("x-data-source", "HIT").code(200).send(issues);
  }
);

import { createIssue } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";
import { CreateIssueDto } from "../../entities";

const verify = async () => {};
export const createIssueRoute = makeFastifyRoute(
  RouteMethod.POST,
  "/issues",
  verify,
  async (request, reply) => {
    const { body } = request;
    const data = body as CreateIssueDto;
    const issue = await createIssue(data);
    return reply.status(201).send(issue);
  }
);

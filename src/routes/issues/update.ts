import { updateIssue } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";
import { UpdateIssueDto } from "../../entities";

const verify = async () => {};
export const updateIssueRoute = makeFastifyRoute(
  RouteMethod.PATCH,
  "/issues",
  verify,
  async (request, reply) => {
    const { body } = request;
    const data = body as UpdateIssueDto;
    const issue = await updateIssue(data);
    return reply.status(201).send(issue);
  }
);

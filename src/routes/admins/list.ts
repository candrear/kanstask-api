import { getAllAdmins, verifyToken } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

export const fetchAllAdminsRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/admins",
  verifyToken,
  async (request, reply) => {
    const { params } = request;
    const { page, limit, search } = params as any;
    const admins = await getAllAdmins({ page, limit, search });
    return reply.header("x-data-source", "HIT").code(200).send(admins);
  }
);

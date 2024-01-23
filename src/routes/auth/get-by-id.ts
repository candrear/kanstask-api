import { getAdminById, verifyToken } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

export const getOneAdminRoute = makeFastifyRoute(
  RouteMethod.GET,
  "/admins/info",
  verifyToken,
  async (request: any, reply) => {
    const { admin } = request;
    const currentAdmin = await getAdminById(admin.uuid);
    return reply.status(201).send(currentAdmin);
  }
);

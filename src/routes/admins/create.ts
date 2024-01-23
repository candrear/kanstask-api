import { createAdmin } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";
import { CreateAdminDto } from "../../entities";

const verify = async () => {};

export const createAdminRoute = makeFastifyRoute(
  RouteMethod.POST,
  "/admins",
  verify,
  async (request, reply) => {
    const { body } = request;
    const data = body as CreateAdminDto;
    const admin = await createAdmin(data);
    return reply.status(201).send(admin);
  }
);

import { login } from "../../business-logic";
import { RouteMethod, makeFastifyRoute } from "../../constant-definitions";

const verify = async () => {};
export const loginRoute = makeFastifyRoute(
  RouteMethod.POST,
  "/auth/login",
  verify,
  async (request, reply) => {
    const { body } = request;
    const data = body as { username: string; password: string };
    console.log(data);
    const code = 0;
    const admin = await login({ ...data, code });
    return reply.status(201).send(admin);
  }
);

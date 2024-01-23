import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

interface FastifyRequestAdmin extends FastifyRequest {
  admin?: string;
}

export enum RouteMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

export const makeFastifyRoute = (
  method: RouteMethod,
  url: string,
  authFunction: (req: FastifyRequestAdmin, reply: FastifyReply) => Promise<any>,
  handler: (req: FastifyRequest, reply: FastifyReply) => Promise<void>,
  extraOptions?: Partial<Omit<RouteOptions, "handler">>
): RouteOptions => {
  const enhancedHandler: RouteOptions["handler"] = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    await authFunction(request, reply);
    return handler(request, reply);
  };

  return {
    ...extraOptions,
    method,
    url,
    handler: enhancedHandler,
  };
};

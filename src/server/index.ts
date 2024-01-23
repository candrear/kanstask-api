import "dotenv/config";
import fastify from "fastify";
import { logger } from "../utils";
import { registerRoutes } from "../routes";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { verify } from "../business-logic";
import { initDataSources } from "../data-sources";

const { PORT, HOST, MONGODB_URL } = process.env;
const corsOptions = {
  origin: "*",
};
declare module "fastify" {
  interface FastifyRequest {
    admin?: string;
  }
}

const main = async () => {
  await initDataSources({
    mongoose: {
      mongoUrl: MONGODB_URL,
    },
  });

  const server = fastify({
    logger,
  });
  server.register(fastifyCors, corsOptions);
  server.addHook("preValidation", verify);
  server.register(fastifyMultipart);
  server.register(
    (instance, options, next) => {
      registerRoutes(instance);
      next();
    },
    { prefix: "api/v1" }
  );

  server.listen({ port: Number(PORT), host: HOST }, (error, address) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }
    server.log.info(`Backend App is running at ${address}`);
    server.log.info("Press CTRL-c to stop");
  });
};

void main();

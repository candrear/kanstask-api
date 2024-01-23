import pino from "pino";

export const logger = pino({
  redact: ["MONGODB_URL"],
  level: "debug",
  transport: {
    target: "pino-pretty",
  },
});
import { FastifyRequest } from "fastify";

import { alertOverrideConflict } from "../alert-override-conflict";
import { NormalizedRequest, RequestInterface } from "../../types";

export const normalizeFastifyRequest = <
  R extends RequestInterface = RequestInterface
>({
  method,
  protocol,
  hostname,
  url,
  headers,
  body,
  ip,
  ips,
  params,
  query,
}: FastifyRequest): NormalizedRequest<R> => {
  const normalizedHeaders: RequestInterface["Headers"] = headers
    ? Object.keys(headers).reduce((a, b) => {
        if (typeof headers[b] !== "undefined") {
          a[b.toLowerCase()] = headers[b] as string;
        }

        return a;
      }, {} as RequestInterface["Headers"])
    : ({} as RequestInterface["Headers"]);

  const subdomains =
    ((hostname || "").match(/\./g) || []).length > 1
      ? hostname.split(".").slice(0, -2)
      : [];

  const path = url.split("?")[0];

  alertOverrideConflict(body || {}, params || {}, (message) =>
    console.error(message)
  );

  const newBody = {
    ...((body as Record<string, unknown>) || {}),
    ...((params as Record<string, unknown>) || {}),
  } as unknown as RequestInterface["Body"];

  const newQuery = {
    ...((query as Record<string, unknown>) || {}),
  } as unknown as RequestInterface["Query"];

  return {
    method,
    path: path!,
    headers: normalizedHeaders,
    protocol,
    secure: protocol === "https",
    hostname,
    subdomains,
    body: newBody,
    query: newQuery,
    url,
    ip: (ips ? ips[0] : ip)!,
  };
};

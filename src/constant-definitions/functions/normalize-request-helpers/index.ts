import _ from "lodash";
import { NormalizedRequest } from "../../types";

const FALLBACK_IPS = {
  PR: "173.243.82.95",
  LONDON: "85.90.227.224",
  TEXAS: "23.106.83.147",
  COSTARICA: "191.102.59.114",
  VIRGINIA: "52.90.146.42",
  NICARAGUA: "138.97.161.175",
  CALIFORNIA: "134.201.250.155",
};

const getHeader = (request: NormalizedRequest, headerName: string): string =>
  _.get(request.headers, headerName, "");

export const getIPFromRequest = (request: NormalizedRequest): string => {
  const { ip } = request;

  return ip === "127.0.0.1" ? FALLBACK_IPS.CALIFORNIA : ip;
};

export const getUserAgentFromRequest = (request: NormalizedRequest): string => {
  const userAgent = getHeader(request, "user-agent");

  if (!userAgent) throw new Error("Not user-agent found");

  return userAgent;
};

export const getHostnameFromRequest = (request: NormalizedRequest): string =>
  request.hostname;

export const getReferrerFromRequest = (request: NormalizedRequest): string => {
  const referrer = getHeader(request, "referrer");
  if (typeof referrer === "string" && !!referrer) return referrer;

  return getHeader(request, "referer");
};

export const getURLFromRequest = (request: NormalizedRequest): string =>
  request.url;

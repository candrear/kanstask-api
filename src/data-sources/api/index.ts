import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

type milliseconds = number;
export type PayloadId = string;

export type QueueableFunction<O = { [k: string]: any }, R = void> = (
  options: O
) => Promise<R>;

export interface InitApiOptions {
  apiBaseUrl: string;
  apiName: string;
  headers?: AxiosRequestHeaders;
  rateLimitMs?: number;
  timeout?: number;
  maxRetries?: number;
}

export interface FunctionQueueResult<R = void> {
  id: PayloadId;
  duration: milliseconds;
  startTimestamp: number;
  endTimestamp: number;
  result?: R;
  error?: any;
}

export interface GenericApi {
  request: (config: AxiosRequestConfig) => Promise<FunctionQueueResult<any>>;
}

export const initApi = async ({
  apiBaseUrl,
  headers,
}: InitApiOptions) => {
  const api = axios.create({
    baseURL: apiBaseUrl,
    headers,
  });

  const requestFn: QueueableFunction<
    AxiosRequestConfig,
    AxiosResponse["data"]
  > = (config: AxiosRequestConfig) => {
    return api.request(config).then(({ data }) => data);
  };
};

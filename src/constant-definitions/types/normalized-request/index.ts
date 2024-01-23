export interface RequestInterface {
    Body: any;
    Query: any;
    Headers: any;
}
  
export interface NormalizedRequest<R extends RequestInterface = RequestInterface> {
    protocol: string;
    secure: boolean;
    subdomains: string[];
    path: string;
    hostname: string;
    headers: R['Headers'];
    body: R['Body'];
    method: string;
    query: R['Query'];
    url: string;
    ip: string;
}
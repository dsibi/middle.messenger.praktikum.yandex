type Options = {
  data?: any;
  headers?: Record<string, string>;
  method?: string;
  timeout?: number;
  withCredentials?: boolean;
};

type OptionsWithoutMethod = Omit<Options, "method">;

type TResponse = <R = unknown>(
  url: string,
  options: OptionsWithoutMethod
) => Promise<R>;

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

function queryStringify(data: any) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  private baseURL: string = "https://ya-praktikum.tech/api/v2";
  protected fullURL: string;

  constructor(url: string) {
    this.fullURL = this.baseURL + url;
  }

  get: TResponse = (url, options = {}) => {
    const newURL = new URL(this.fullURL + url).href;
    return this.request(
      options.data ? `${newURL}?${queryStringify(options.data)}` : newURL,
      { ...options, method: METHODS.GET }
    );
  };

  post: TResponse = (url, options = {}) => {
    const newURL = new URL(this.fullURL + url).href;
    return this.request(newURL, { ...options, method: METHODS.POST });
  };

  put: TResponse = (url, options = {}) => {
    const newURL = new URL(this.fullURL + url).href;
    return this.request(newURL, { ...options, method: METHODS.PUT });
  };

  // delete: HTTPMethod = (url, options = {}) =>
  //   this.request(url, {
  //     ...options,
  //     method: METHODS.DELETE,
  //   });

  async request(url: string, options: Options = { method: METHODS.GET }) {
    const { method, data } = options;

    let response;

    if (data instanceof FormData) {
      response = await fetch(url, {
        method,
        credentials: "include",
        mode: "cors",
        body: data,
      });
    } else {
      response = await fetch(url, {
        method,
        credentials: "include",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : null,
      });
    }

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const resultData = (await isJson) ? response.json() : null;

    return resultData;
  }
}

type Options = {
  data?: any;
  headers?: Record<string, string>;
  method?: string;
  timeout?: number;
  withCredentials?: boolean;
};

type OptionsWithoutMethod = Omit<Options, "method">;

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

  get<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<TResponse> {
    const newURL = new URL(this.fullURL + url).href;
    return this.request<TResponse>(
      options.data ? `${newURL}?${queryStringify(options.data)}` : newURL,
      { ...options, method: METHODS.GET }
    );
  }

  post<Response>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<Response> {
    const newURL = new URL(this.fullURL + url).href;
    return this.request<Response>(newURL, { ...options, method: METHODS.POST });
  }

  put<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<TResponse> {
    const newURL = new URL(this.fullURL + url).href;
    return this.request(newURL, { ...options, method: METHODS.PUT });
  }

  // delete: HTTPMethod = (url, options = {}) =>
  //   this.request(url, {
  //     ...options,
  //     method: METHODS.DELETE,
  //   });

  async request<Response>(
    url: string,
    options: Options = { method: METHODS.GET }
  ): Promise<Response> {
    const { method, data } = options;

    const response = await fetch(url, {
      method,
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const resultData = (await isJson) ? response.json() : null;

    return resultData as Response;
  }

  // request<Response>(
  //   url: string,
  //   options: Options = { method: METHODS.GET }
  // ): Promise<Response> {
  //   const {
  //     method,
  //     data,
  //     headers,
  //     timeout = defaultTimeout,
  //     withCredentials = true,
  //   } = options;
  //   const isFormData = headers?.["Content-Type"] === "multipart/form-data";
  //   if (!method) throw new Error("request method is undefined");

  //   return new Promise<Response>((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(method, url);

  //     if (!isFormData) {
  //       xhr.setRequestHeader("Content-Type", "application/json");
  //     }

  //     if (headers) {
  //       Object.entries(headers).forEach((item) => {
  //         const [key, value] = item;
  //         if (!isFormData) {
  //           xhr.setRequestHeader(key, value);
  //         }
  //       });
  //     }

  //     xhr.timeout = timeout;

  //     xhr.onload = () => resolve(xhr);
  //     xhr.withCredentials = withCredentials;
  //     xhr.onabort = reject;
  //     xhr.onerror = reject;
  //     xhr.ontimeout = reject;

  //     if (method === METHODS.GET || !data) {
  //       xhr.send();
  //     } else {
  //       // console.log(JSON.stringify(data));
  //       xhr.send(JSON.stringify(data as any));
  //     }
  //   });
  // }
}

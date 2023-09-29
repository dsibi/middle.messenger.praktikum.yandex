type Options = {
  data?: any;
  headers?: Record<string, string>;
  method?: string;
  timeout?: number;
  withCredentials?: boolean;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

const defaultTimeout = 5 * 1000; // 5 sec

function queryStringify(data: any) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  private baseURL: string = "https://ya-praktikum.tech/api/v2";
  protected fullURL: URL;

  constructor(url: string) {
    this.fullURL = new URL(this.baseURL + url);
  }

  get: HTTPMethod = (url, options = {}) =>
    this.request(
      options.data ? `${url}?${queryStringify(options.data)}` : url,
      { ...options, method: METHODS.GET }
    );

  post: HTTPMethod = (url, options = {}) => {
    const newURL = new URL(this.fullURL + url).href;
    return this.request(newURL, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, {
      ...options,
      method: METHODS.PUT,
    });

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, {
      ...options,
      method: METHODS.DELETE,
    });

  request: HTTPMethod = (url, options = {}) => {
    const {
      method,
      data,
      headers,
      timeout = defaultTimeout,
      withCredentials = true,
    } = options;
    const isFormData = headers?.["Content-Type"] === "multipart/form-data";
    if (!method) throw new Error("request method is undefined");

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (!isFormData) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      if (headers) {
        Object.entries(headers).forEach((item) => {
          const [key, value] = item;
          if (!isFormData) {
            xhr.setRequestHeader(key, value);
          }
        });
      }

      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);
      xhr.withCredentials = withCredentials;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

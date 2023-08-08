import router from "../utils/Router";
import { fillFields } from "../pages/profile";

const host = "https://ya-praktikum.tech";

export function callGetMethod(
  method: string,
  httpVerb: HttpVerbs,
  path: string
) {
  fetch(`${host}/api/v2/auth/${method}`, {
    method: `${httpVerb}`,
    mode: "cors",
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fillFields(data);
      console.log(data);
      router.go(path);
    });
}

export function callPutMethod(method: string, data: {}, path?: string) {
  fetch(`${host}/api/v2/user/${method}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    if (path) {
      router.go(path);
    }
  });
}

export function callPutAvaMethod(
  method: string,
  data: FormData,
  path?: string
) {
  fetch(`${host}/api/v2/user/${method}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    // headers: { "Content-Type": "multipart/form-data" },
    body: data,
  })
    // .then((response) => {
    //   return response.json();
    // })
    .then((data) => {
      console.log(data);
      // if (path) {
      //   router.go(path);
      // }
    });
}

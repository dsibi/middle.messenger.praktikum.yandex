import router from "../utils/Router";

export default function callMethod(
  method: string,
  httpVerb: HttpVerbs,
  path: string,
  data?: {}
) {
  const host = "https://ya-praktikum.tech";

  fetch(`${host}/api/v2/auth/${method}`, {
    method: `${httpVerb}`,
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json", // Данные отправляем в формате JSON
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status == 200 || response.status == 400) {
        router.go(path);
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}

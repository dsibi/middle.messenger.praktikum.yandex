import router from "./Router";

export default function callMethod(method: string, path: string, data?: {}) {
  const host = "https://ya-praktikum.tech";

  fetch(`${host}/api/v2/auth/${method}`, {
    method: "POST",
    credentials: "include", // Нужно подставлять куки
    mode: "cors", // Работаем с CORS
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

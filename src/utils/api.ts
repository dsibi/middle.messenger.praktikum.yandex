import router from "../utils/Router";

export default function controller(data: {}, path: string) {
  const host = "https://ya-praktikum.tech";

  fetch(`${host}/api/v2/auth/signin`, {
    method: "POST",
    credentials: "include", // Нужно подставлять куки
    mode: "cors", // Работаем с CORS
    headers: {
      "content-type": "application/json", // Данные отправляем в формате JSON
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status == 200 || response.status == 400) {
      router.go(path);
    }
  });
}

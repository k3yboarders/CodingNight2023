const BACKEND_ORIGIN = import.meta.env.PROD
  ? "/api"
  : "https://api.cn.maksymiliangala.com";

export const backendRequest = (
  path: string,
  method: string,
  useAuth: boolean,
  body?: unknown,
) => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token && useAuth) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return fetch(`${BACKEND_ORIGIN}/${path}`, {
    method: method,
    headers: headers,
    redirect: "follow",
    body: JSON.stringify(body),
  });
};
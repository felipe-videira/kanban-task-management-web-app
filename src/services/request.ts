import axios from "axios";

export default async function request(
  url: string,
  method: string,
  data: Record<string, unknown> | null = null,
  baseUrl = import.meta.env.VITE_API_HOST
) {
  const { data: res } = await axios({
    method,
    url: baseUrl + url,
    data,
  });
  return res;
}

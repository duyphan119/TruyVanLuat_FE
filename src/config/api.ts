import axios, { AxiosInstance } from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:8000/api",
// });

// const apiGet = async (path: string, params?: any) => {
//   const { data } = await instance.get(path, { params });
//   return data;
// };

// const apiPost = async (path: string, body?: any) => {
//   const { data } = await instance.post(path, body);
//   return data;
// };

// const apiPatch = async (path: string, body?: any) => {
//   const { data } = await instance.patch(path, body);
//   return data;
// };

// const apiDelete = async (path: string, body?: any) => {
//   const { data } = await instance.delete(path, body);
//   return data;
// };

// export const api = {
//   get: apiGet,
//   post: apiPost,
//   patch: apiPatch,
//   delete: apiDelete,
// };

class API {
  instance: AxiosInstance;
  constructor(baseURL?: string, bearerToken?: string) {
    this.instance = axios.create({
      baseURL: baseURL || "http://localhost:3000/api",
      withCredentials: true,
      ...(bearerToken
        ? {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        : {}),
    });
  }

  async get(path: string, params?: any) {
    const { data } = await this.instance.get(path, {
      params,
    });
    return data;
  }

  async post(path: string, body?: any) {
    const { data } = await this.instance.post(path, body);
    return data;
  }

  async patch(path: string, body?: any) {
    const { data } = await this.instance.patch(path, body);
    return data;
  }

  async delete(path: string) {
    const { data } = await this.instance.delete(path);
    return data;
  }
}

export default API;

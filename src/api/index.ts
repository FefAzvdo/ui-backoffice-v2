import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { token } from "../storage";

export const baseUrl = () => {
  return window.config.baseUrl;
};

export const loginUrl = () => {
  return window.config.loginUrl;
};

export const api = axios.create({
  baseURL: baseUrl(),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json", //this line solved cors
  },
});

// Adicione um interceptor de solicitação
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Faça algo antes de enviar a solicitação, como adicionar cabeçalhos personalizados
    // console.log("Request Interceptor:", config);
    // console.log("🚀 ~ token:", token);
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    // Faça algo com erros de solicitação
    return Promise.reject(error);
  }
);

// Adicione um interceptor de resposta
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Faça algo com os dados de resposta, como manipular erros globais
    // console.log("Response Interceptor:", response);

    return response;
  },
  (error: AxiosError) => {
    // Faça algo com erros de resposta
    if (error.response?.status === 403) {
      // console.log("🚀 ~ error.response?.status:", error.response?.status);
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

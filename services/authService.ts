import { api } from "@/api/client";
import * as SecureStore from "expo-secure-store";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/auth/login", data);

  const token = response.data.accessToken;

  await SecureStore.setItemAsync("accessToken", token);

  return token;
}

export async function getAccessToken() {
  return await SecureStore.getItemAsync("accessToken");
}

export async function logout() {
  await SecureStore.deleteItemAsync("accessToken");
}

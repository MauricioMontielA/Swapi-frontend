import { api } from "./client";

export const getCollections = async () => {
  const response = await api.get("/collections");

  return response.data;
};

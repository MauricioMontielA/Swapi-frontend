import { api } from "./client";

export const getCollections = async () => {
  const response = await api.get("/collection");

  return response.data;
};

export const getCollectionsAdd = async () => {
  const response = await api.get("/collection/add");

  return response.data;
};

export const getItemsAdd = async (
  collectionId: number,
  page: number,
  size: number,
) => {
  const response = await api.get("/collectible-item", {
    params: { collectionId, page, size },
  });

  return response.data;
};

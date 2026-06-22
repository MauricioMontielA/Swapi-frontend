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
  const response = await api.get(`/collectible-item/add`, {
    params: {
      collectionId,
      page,
      size,
    },
  });

  return response.data;
};

export const addItemsToCollection = async (
  collectibleItemIds: number[],
  collectionId: number,
) => {
  const response = await api.post("/user-collectible", {
    collectibleItemIds,
    collectionId,
  });
  console.log(response.data);
  return response.data;
};

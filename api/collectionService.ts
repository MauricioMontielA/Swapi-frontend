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
  name?: string,
) => {
  const response = await api.get(`/collectible-item/add`, {
    params: {
      collectionId,
      name: name?.trim() || undefined,
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
  return response.data;
};

export type CollectionSticker = {
  id: number;
  number: string;
  owned: number;
  imageUrl?: string;
};

export type CollectionStickersPage = {
  content: CollectionSticker[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

export const getCollectionStickers = async (
  collectionId: number,
  page: number,
  size: number,
) => {
  const response = await api.get<CollectionStickersPage>("/user-collectible", {
    params: { collectionId, page, size },
  });

  return response.data;
};

export type TradeProposalItemsRequest = {
  targetUserId: number;
  collectionId: number;
  filteredIds: number[];
};

export type TradeCandidateItem = {
  userCollectibleId: number;
  collectibleItemNumber: string;
  collectibleItemName: string;
  collectibleItemImageUrl: string;
};

export type TradeProposalItemsResponse = {
  desiredItems: TradeCandidateItem[];
  offeredItems: TradeCandidateItem[];
};

export type CurrentUserProfile = {
  id: number;
  username: string;
  profileImageUrl?: string;
};

export type TradeItemRequest = {
  fromUser: number;
  toUser: number;
  userCollectible: number;
  quantity: number;
};

export const getTradeProposalItems = async (
  request: TradeProposalItemsRequest,
) => {
  const response = await api.post<TradeProposalItemsResponse>(
    "/trade/proposal-items",
    request,
  );

  return response.data;
};

export const getCurrentUserProfile = async () => {
  const response = await api.get<CurrentUserProfile>("/user/profile/me");
  return response.data;
};

export const createTrade = async (itemsToTrade: TradeItemRequest[]) => {
  const response = await api.post("/trade", { itemsToTrade });
  return response.data;
};

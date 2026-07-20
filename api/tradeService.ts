import { api } from "./client";

export type TradeStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";

export type TradeItem = {
  id: number;
  name: string;
  number: string;
  imageUrl: string;
};

export type Trade = {
  id: string;
  status: TradeStatus;
  direction: "incoming" | "outgoing";
  timeQuantity: number;
  timeUom: string;
  collection: string;
  note?: string;
  trader: {
    name: string;
    profileImageUrl: string;
    reputation: number;
    trades: number;
  };
  offeredItems: TradeItem[];
  requestedItems: TradeItem[];
};

export type TradesPageResponse = {
  content: Trade[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

/**
 * Contrato esperado para el listado pageable de trades.
 * Ajusta únicamente la ruta o el nombre del parámetro `status` si el backend
 * publica una convención diferente; la pantalla ya consume esta respuesta.
 */
export const getTradesPage = async (
  status: TradeStatus,
  page: number,
  size: number,
) => {
  const response = await api.get<TradesPageResponse>("/trade", {
    params: { status, page, size },
  });

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

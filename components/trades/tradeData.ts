import type {
  Trade,
  TradeItem,
  TradesPageResponse,
  TradeStatus,
} from "@/api/tradeService";

const images = [
  "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=500",
  "https://images.unsplash.com/photo-1606503153255-59d8b8bdb7b1?w=500",
  "https://images.unsplash.com/photo-1611931960487-4932667079a9?w=500",
  "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=500",
  "https://images.unsplash.com/photo-1594784054224-31e1c6f0f75b?w=500",
];

const sticker = (id: number, name: string, number: string): TradeItem => ({
  id,
  name,
  number,
  imageUrl: images[(id - 1) % images.length],
});

export const demoTrades: Trade[] = [
  {
    id: "trade-101",
    status: "OPEN",
    direction: "incoming",
    timeQuantity: 2,
    timeUom: "hace 2 h",
    collection: "Mundial Legends 2026",
    note: "¡Hola! Estas tres completan varias páginas de nuestros álbumes.",
    trader: {
      name: "Marcus Chen",
      profileImageUrl: "https://i.pravatar.cc/160?img=12",
      reputation: 4.8,
      trades: 124,
    },
    offeredItems: [
      sticker(1, "Dragón estelar", "#042"),
      sticker(2, "Guardián lunar", "#108"),
      sticker(3, "Fénix dorado", "#156"),
    ],
    requestedItems: [
      sticker(4, "Héroe neón", "#021"),
      sticker(5, "Ciudad orbital", "#077"),
    ],
  },
  {
    id: "trade-102",
    status: "OPEN",
    direction: "outgoing",
    timeQuantity: 1,
    timeUom: "hace 2 h",
    collection: "Mundial Legends 2026",
    trader: {
      name: "Sofia Reyes",
      profileImageUrl: "https://i.pravatar.cc/160?img=47",
      reputation: 4.9,
      trades: 81,
    },
    offeredItems: [
      sticker(6, "Capitana solar", "#011"),
      sticker(7, "Arena central", "#064"),
    ],
    requestedItems: [
      sticker(8, "Trofeo galáctico", "#001"),
      sticker(9, "Equipo Nova", "#092"),
      sticker(10, "Cometa azul", "#121"),
      sticker(11, "Leyenda IX", "#200"),
    ],
  },
  {
    id: "trade-201",
    status: "OPEN",
    direction: "incoming",
    timeQuantity: 1,
    timeUom: "hace 2 h",
    collection: "Neo-Vintage",
    trader: {
      name: "Alex Rivera",
      profileImageUrl: "https://i.pravatar.cc/160?img=11",
      reputation: 4.8,
      trades: 124,
    },
    offeredItems: [
      sticker(12, "Ethereal Dragon", "#042"),
      sticker(13, "Prisma Zero", "#043"),
    ],
    requestedItems: [
      sticker(14, "Neo-Tokyo", "#088"),
      sticker(15, "Mecha Cat", "#089"),
      sticker(16, "Night Rider", "#090"),
    ],
  },
  {
    id: "trade-301",
    status: "OPEN",
    direction: "outgoing",
    timeQuantity: 1,
    timeUom: "hace 2 h",
    collection: "Clásicos 1998",
    trader: {
      name: "Diana Cruz",
      profileImageUrl: "https://i.pravatar.cc/160?img=32",
      reputation: 5,
      trades: 56,
    },
    offeredItems: [sticker(17, "Final histórica", "#250")],
    requestedItems: [
      sticker(18, "Estadio azul", "#101"),
      sticker(19, "Portero legendario", "#145"),
    ],
  },
];

// Contrato temporal equivalente al que deberá devolver el endpoint pageable.
export const getDemoTradesPage = async (
  status: TradeStatus,
  page: number,
  size: number,
): Promise<TradesPageResponse> => {
  const filteredTrades = demoTrades.filter((trade) => trade.status === status);
  const start = page * size;

  return {
    content: filteredTrades.slice(start, start + size),
    page: {
      size,
      number: page,
      totalElements: filteredTrades.length,
      totalPages: Math.ceil(filteredTrades.length / size),
    },
  };
};

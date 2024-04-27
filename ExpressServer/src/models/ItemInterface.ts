interface ItemsData {
  [index: string]: {
    _id: string;
    name: string;
    type: string;
    rarity: string;
    rarityColor: string;
    marketPrice: number | string;
    NPCPrice: number | string;
    slots?: number;
  };
}

interface ItemsDataExtended extends ItemsData {
  [index: string]: {
    _id: string;
    name: string;
    type: string;
    rarity: string;
    rarityColor: string;
    marketPrice: number | string;
    NPCPrice: number | string;

    // Extended fields
    amount: number;
    slots?: number;
  };
}

export { ItemsData, ItemsDataExtended };

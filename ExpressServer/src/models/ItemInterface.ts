interface ItemsData {
  [index: string]: {
    _id: string;
    name: string;
    type: string;
    rarity: string;
    rarityColor: string;
    marketPrice: number | string;
    NPCPrice: number | string;
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
  };
}

export { ItemsData, ItemsDataExtended };

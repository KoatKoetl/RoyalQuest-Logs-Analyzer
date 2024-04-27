import { ItemsData } from '../models/ItemInterface.js';

const getNPCPrices = (element: HTMLElement, itemName: string, itemsObject: ItemsData) => {
  const parentElementValue: string | undefined = element.parentNode?.textContent?.trim();
  const matchSoldItems = parentElementValue?.match(/^([Ss]ell|[Пп]родано)/i);
  const matchMultipleItems = parentElementValue?.match(/^([Ss]ell|[Пп]родано) (\d+)/i);

  if (matchSoldItems) {
    const matchSellPrice = parentElementValue?.match(/[Зз]а (\d+)/i);
    const fullPrice = parseInt(matchSellPrice ? matchSellPrice[1] : '0');

    if (matchMultipleItems) {
      const totalItems = parseInt(matchMultipleItems && matchMultipleItems[2]);
      const pricePerItem = fullPrice / totalItems;
      itemsObject[itemName].NPCPrice = pricePerItem;
    } else {
      itemsObject[itemName].NPCPrice = fullPrice;
    }
  }

  return itemsObject;
};

const getMarketPrices = (element: HTMLElement, itemName: string, itemsObject: ItemsData) => {
  const parentElementValue: string | undefined = element.parentNode?.textContent?.trim();
  const matchBuyItem = parentElementValue?.match(/^([Кк]уплен)/i);
  const matchMultipleItems = parentElementValue?.match(/(\d+)шт|(\d+)pcs/i);

  if (matchBuyItem) {
    const matchSellPrice = parentElementValue?.match(/[Зз]а (\d+)/i);
    const fullPrice = parseInt(matchSellPrice ? matchSellPrice[1] : '0');

    if (matchMultipleItems) {
      const totalItems = parseInt(matchMultipleItems && matchMultipleItems[1]);
      const pricePerItem = fullPrice / totalItems;
      itemsObject[itemName].marketPrice = pricePerItem;
    } else {
      itemsObject[itemName].marketPrice = fullPrice;
    }
  }

  return itemsObject;
};

export { getMarketPrices, getNPCPrices };

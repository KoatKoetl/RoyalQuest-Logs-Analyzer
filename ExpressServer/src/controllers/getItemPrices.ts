const getNPCPrices = (element: HTMLElement, itemsObject: any) => {
  const parentElementValue: string | undefined = element.parentNode?.textContent?.trim();
  const matchSoldItems = parentElementValue?.match(/^([Ss]ell|[Пп]родано)/i);
  const matchMultipleItems = parentElementValue?.match(/^([Ss]ell|[Пп]родано) (\d+)/i);

  if (matchSoldItems) {
    const text: string = element.textContent?.trim().replace(/ /g, '_') as string;
    const matchSellPrice = parentElementValue?.match(/[Зз]а (\d+)/i);
    const fullPrice = parseInt(matchSellPrice ? matchSellPrice[1] : '0');

    if (matchMultipleItems) {
      const totalItems = parseInt(matchMultipleItems && matchMultipleItems[2]);
      const pricePerItem = fullPrice / totalItems;
      itemsObject[text].NPCPrice = pricePerItem;
    } else {
      itemsObject[text].NPCPrice = fullPrice;
    }
  }

  return itemsObject;
};

const getMarketPrices = () => {};

export { getNPCPrices };

export type TradeType = {
  id: string;
  price: string;
  qty: string;
  quoteQty: string;
  time: number | string;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

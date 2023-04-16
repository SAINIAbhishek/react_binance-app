import {SymbolFilter} from "./SymbolFilter";

export type SymbolType = {
  "symbol": string;
  "status": string;
  "baseAsset": string;
  "baseAssetPrecision": number;
  "quoteAsset": string;
  "quotePrecision": number;
  "quoteAssetPrecision": number;
  "baseCommissionPrecision": number;
  "quoteCommissionPrecision": number;
  "orderTypes": string[];
  "icebergAllowed": boolean;
  "ocoAllowed": boolean;
  "quoteOrderQtyMarketAllowed": boolean;
  "allowTrailingStop": boolean;
  "cancelReplaceAllowed": boolean;
  "isSpotTradingAllowed": boolean;
  "isMarginTradingAllowed": boolean;
  "filters": SymbolFilter[];
  "permissions": string[];
  "defaultSelfTradePreventionMode": string;
  "allowedSelfTradePreventionModes": string[];
}

import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  upper_bound: number;
  lower_bound: number;
  timestamp: Date;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    // the data has been changed to single row data using Row interface
    const priceABC =
      (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF =
      (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp:
        serverRespond[0].timestamp > serverRespond[1].timestamp
          ? serverRespond[0].timestamp
          : serverRespond[1].timestamp,
      upper_bound,
      lower_bound,
      trigger_alert:
        ratio > upper_bound || ratio < lower_bound ? ratio : undefined,
    };
  }
}

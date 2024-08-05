export interface IIRetailAggregationService {
  BarCodeSync(data: any): Promise<any>;
  StockStatusSync(data: any): Promise<any>;
  ProductPriceSync(data: any): Promise<any>;
}

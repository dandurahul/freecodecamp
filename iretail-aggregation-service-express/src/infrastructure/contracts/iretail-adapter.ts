export interface IRetailAdapter {
  BarCodeSync(data: any): Promise<any>;
  StockCodeSync(data: any): Promise<any>;
  ProductPriceSync(data: any): Promise<any>;
  generateToken(headerWithOutToken: any): Promise<any>;
  getBarCodeProducts(headerWithToken: any): Promise<any>;
  getStockStatus(headerWithToken: any): Promise<any>;
  getProductPrice(headerWithToken: any): Promise<any>;
}

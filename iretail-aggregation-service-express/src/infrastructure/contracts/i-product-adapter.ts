export interface IProductAdapter {
  getAllUnits(filterType: any): Promise<any>;
  getAllProductsByIds(productIds: any, filterType: any): Promise<any>;
  updateProductWithBarcodes(data: any): Promise<any>;
  getProductsByProductCode(data: any, filterType: any): Promise<any>;
}

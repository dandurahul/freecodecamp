export interface ICommonService {
  getRequiredDataForQuantity(
    entityInternalId: any,
    orderProduct: any
  ): Promise<any>;
  // DefaultTokenGenerationAndGetProducts(
  //   MERCHANT_CODE: any,
  //   currentDate: any,
  //   type: any,
  //   erpStoreCode: any
  // ): Promise<any>;
  TokenGenerationAndGetProducts(
    MERCHANT_CODE: any,
    currentDate: any,
    batchNumber: any,
    batchSize: any,
    erpStoreCode: any,
    type: any
  ): Promise<any>;
  getProductListByType(data: any, token: any): Promise<any>;
  // dataSegiragator(iretailData: any, globalData: any): Promise<any>;
}

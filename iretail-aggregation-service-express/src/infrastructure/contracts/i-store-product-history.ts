export interface IStoreProductHistoryAdapter {
  getStoreProductHistoryList(
    data: any,
    page: any,
    pageSize: number,
    filterType: any
  ): Promise<any>;
  createStoreProductHistoryBulk(data: any): Promise<any>;
}

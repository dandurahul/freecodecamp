export interface IStoreCatelogAdapter {
  getStoreCatelogProducts(
    fiterObject: any,
    filterType: any,
    page: number,
    pageSize: number
  ): Promise<any>;
}

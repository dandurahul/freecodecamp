export interface IReelSalesService {
  createReelSales(data: any): Promise<any>;
  getReelSales(
    filterCriteria: any,
    filterType: any,
    pageSize: any,
    page: any
  ): Promise<any>;
  updateReelSales(id: any, data: any): Promise<any>;
  filterReelSales(
    filterCriteria: any,
    filterType: any,
    pageSize: any,
    page: any,
    sort: any
  ): Promise<any>;
  filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<any>;
  deleteReelSales(ids: any): Promise<any>;
  getReelSalesById(id: any): Promise<any>;
  updateByAction(id: any, action: any): Promise<any>;
}

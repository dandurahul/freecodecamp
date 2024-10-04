export interface IReelSalesRepository {
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
    populate: any,
    page: any,
    sort: any
  ): Promise<any>;
  deleteReelSales(ids: any): Promise<any>;
  filterByPagination(
    filterCriteria?: any,
    pageSize?: number,
    page?: number
  ): Promise<any>;
  getReelSalesById(id: any): Promise<any>;
  updateByAction(id: any, data: any): Promise<any>;
}

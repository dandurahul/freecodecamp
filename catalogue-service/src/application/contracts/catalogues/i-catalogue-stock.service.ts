import { CatalogueStockModel } from "../../../domain/models/catalogues/catalogue-stocks.model";

export interface ICatalogueStockService {
  createOrUpdateCatalogueStock(
    filter: any,
    stock: number,
    filterType?:string
  ): Promise<CatalogueStockModel>;
  getCatalogueStock(
    query: any,
    filterType: string | undefined
  ): Promise<CatalogueStockModel>;
  createCatalogueStocks(
    catalgueStocks: any,
    filterType: string | undefined
  ): Promise<CatalogueStockModel[]>;
  filterCatalogueStocks(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<any>;
}

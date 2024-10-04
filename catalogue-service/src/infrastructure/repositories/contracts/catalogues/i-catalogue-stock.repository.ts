import { ICatalogueStockEntity } from "../../entities/catalogues/catalogue-stocks.entity";

export interface ICatalogueStockRepository {
  updateCatalogueStock(
    filter: any,
    stocks: number,
    filerType?:string
  ): Promise<ICatalogueStockEntity>;
  getCatalogueStock(
    query: any,
    filterType: string | undefined
  ): Promise<ICatalogueStockEntity>;
  filterCatalogueStock(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<ICatalogueStockEntity[]>;
  createCatalogueStocks(
    categoryEntity: ICatalogueStockEntity[]
  ): Promise<ICatalogueStockEntity[]>;
  deleteCatalogueStocks(
    query: ICatalogueStockEntity
  ): Promise<ICatalogueStockEntity>;
}

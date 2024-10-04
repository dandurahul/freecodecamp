import { IWebCatalogueEntity } from "../../entities/catalogues/web-catalogues.entity";

export interface IWebCatalogueRepository {
  createWebCatalogue(
    catalogue: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity>;
  getWebCatalogue(query: any): Promise<IWebCatalogueEntity>;
  getAllWebCatalogues(query: any): Promise<IWebCatalogueEntity[]>;
  updateWebCatalogue(
    id: string,
    catalogue: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity>;
  deleteWebCatalogue(id: string): Promise<void>;
  filterWebCatalogues(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<IWebCatalogueEntity[]>;
  createWebCatalogues(
    webCatalogue: IWebCatalogueEntity[]
  ): Promise<IWebCatalogueEntity[]>;
  updateWebCatalogues(webCatalogue: IWebCatalogueEntity[]): Promise<any>;
  filterByPagination(filterCriteria: any): Promise<any>;
  getProductCountBasedOnStores(filterCriteria: any): Promise<any>;
  updateBulkWebCatalogue(
    query: object,
    catalogueEntity: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity>;
  bulkInsert(
    storeCatalogue: IWebCatalogueEntity[]
  ): Promise<IWebCatalogueEntity[]>;
}

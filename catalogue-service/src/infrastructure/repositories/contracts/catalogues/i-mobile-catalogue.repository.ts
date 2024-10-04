import { IWebCatalogueEntity } from "../../entities/catalogues/web-catalogues.entity";

export interface IMobileCatalogueRepository {
  createMobileCatalogue(
    catalogue: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity>;
  getMobileCatalogue(query: any): Promise<IWebCatalogueEntity>;
  getAllMobileCatalogues(query: any): Promise<IWebCatalogueEntity[]>;
  updateMobileCatalogue(
    id: string,
    catalogue: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity>;
  deleteMobileCatalogue(id: string): Promise<void>;
  filterMobileCatalogues(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<IWebCatalogueEntity[]>;
  createMobileCatalogues(
    webCatalogue: IWebCatalogueEntity[]
  ): Promise<IWebCatalogueEntity[]>;
  updateMobileCatalogues(webCatalogue: IWebCatalogueEntity[]): Promise<any>;
  filterByPagination(filterCriteria: any): Promise<any>;
  getProductCountBasedOnStores(filterCriteria: any): Promise<any>;
  updateBulkMobileCatalogue(
    query: object,
    catalogueEntity: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity>;
  bulkInsert(
    storeCatalogue: IWebCatalogueEntity[]
  ): Promise<IWebCatalogueEntity[]>;
}

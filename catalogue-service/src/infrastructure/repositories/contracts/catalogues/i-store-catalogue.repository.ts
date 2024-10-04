import { IGlobalCatalogueEntity } from "../../entities/catalogues/global-catalogues.entity";
import { IStoreCatalogueEntity } from "../../entities/catalogues/store-catalogues.entity";

export interface IStoreCatalogueRepository {
  createStoreCatalogue(
    catalogue: IStoreCatalogueEntity
  ): Promise<IStoreCatalogueEntity>;
  getStoreCatalogue(query: any): Promise<IStoreCatalogueEntity>;
  getAllStoreCatalogues(query: any): Promise<IStoreCatalogueEntity[]>;
  updateStoreCatalogue(
    id: string,
    catalogue: IStoreCatalogueEntity
  ): Promise<IStoreCatalogueEntity>;
  deleteStoreCatalogue(id: string): Promise<void>;
  filterStoreCatalogues(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<IStoreCatalogueEntity[]>;
  createStoreCatalogues(
    storeCatalogue: IStoreCatalogueEntity[]
  ): Promise<IStoreCatalogueEntity[]>;
  updateStoreCatalogues(storeCatalogue: any[]): Promise<any>;
  filterByPagination(filterCriteria: any): Promise<any>;
  getProductCountBasedOnStores(filterCriteria: any): Promise<any>;
  updateBulkStoreCatalogue(
    query: object,
    catalogueEntity: IStoreCatalogueEntity
  ): Promise<IStoreCatalogueEntity>;
  bulkInsert(
    storeCatalogue: IStoreCatalogueEntity[]
  ): Promise<IStoreCatalogueEntity[]>;
  getUnsyncedProductBasedOnStores(
    highlightIds: any,
    productIds: any[]
  ): Promise<any>;
  fetchUnsyncedHighlightIds(highlightIds: any, productIds: any[]): Promise<any>;
  fetchUnsyncedHighlightIdsBasedOnProductIds(
    data: [
      {
        productIds: string[];
        highlightId: string;
      }
    ]
  ): Promise<any>;
  getAccumulatedStoreStocks(): Promise<any>;
}

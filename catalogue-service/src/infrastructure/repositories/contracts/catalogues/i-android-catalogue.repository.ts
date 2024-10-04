import { IAndroidCatalogueEntity } from "../../entities/catalogues/android-catalogue.entity";

export interface IAndroidCatalogueRepository {
  createAndroidCatalogue(
    catalogue: IAndroidCatalogueEntity
  ): Promise<IAndroidCatalogueEntity>;
  getAndroidCatalogue(query: any): Promise<IAndroidCatalogueEntity>;
  getAllAndroidCatalogues(query: any): Promise<IAndroidCatalogueEntity[]>;
  updateAndroidCatalogue(
    id: string,
    catalogue: IAndroidCatalogueEntity
  ): Promise<IAndroidCatalogueEntity>;
  deleteAndroidCatalogue(id: string): Promise<void>;
  filterAndroidCatalogues(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<IAndroidCatalogueEntity[]>;
  createAndroidCatalogues(
    androidCatalogue: IAndroidCatalogueEntity[]
  ): Promise<IAndroidCatalogueEntity[]>;
  updateAndroidCatalogues(
    AndroidCatalogue: IAndroidCatalogueEntity[]
  ): Promise<any>;
  filterByPagination(filterCriteria: any): Promise<any>;
  getProductCountBasedOnStores(filterCriteria: any): Promise<any>;
  updateBulkAndroidCatalogue(
    query: object,
    catalogueEntity: IAndroidCatalogueEntity
  ): Promise<IAndroidCatalogueEntity>;
  bulkInsert(
    androidCatalogue: IAndroidCatalogueEntity[]
  ): Promise<IAndroidCatalogueEntity[]>;
}

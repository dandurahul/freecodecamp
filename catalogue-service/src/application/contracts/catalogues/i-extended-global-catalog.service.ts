import { ExtendedGlobalCatalogModel } from "../../../domain/models/catalogues/extended-global-catalog.model";

export interface IExtendedGlobalCatalogService {
  createExtendedGlobalCatalog(
    extendedGlobalCatalog: ExtendedGlobalCatalogModel
  ): Promise<ExtendedGlobalCatalogModel>;

  getExtendedGlobalCatalogById(id: string): Promise<ExtendedGlobalCatalogModel>;
  getAllExtendedGlobalCatalogDetails(
    filterType: string
  ): Promise<ExtendedGlobalCatalogModel[]>;
  updateExtendedGlobalCatalog(
    _id: string,
    extendedGlobalCatalog: ExtendedGlobalCatalogModel
  ): Promise<ExtendedGlobalCatalogModel>;
  deleteExtendedGlobalCatalog(id: string): Promise<void>;
  filterExtendedGlobalCatalog(
    filterCriteria: Object,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<ExtendedGlobalCatalogModel[]>;
  updateExtendedGlobalCatalogues(
    extendedGlobalCatalogs: any[],
  ): Promise<any>
  bulkUpdateForExtendedCatalogues(
    query: object,
    catalogueEntity: ExtendedGlobalCatalogModel
  ): Promise<ExtendedGlobalCatalogModel>;
}

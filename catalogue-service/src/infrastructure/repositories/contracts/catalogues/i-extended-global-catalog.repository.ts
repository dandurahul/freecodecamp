import { IExtendedGlobalCatalogEntity } from "../../entities/catalogues/extended-global-catalog.entity";

export interface IExtendedGlobalCatalogRepository {
  createExtendedGlobalCatalog(
    ExtendedGlobalCatalogEntity: IExtendedGlobalCatalogEntity
  ): Promise<IExtendedGlobalCatalogEntity>;
  bulkInsert(
    ExtendedGlobalCatalogEntity: IExtendedGlobalCatalogEntity[]
  ): Promise<IExtendedGlobalCatalogEntity[]>;
  getExtendedGlobalCatalog(query: any): Promise<IExtendedGlobalCatalogEntity>;
  getAllExtendedGlobalCatalogDetails(
    query: any
  ): Promise<IExtendedGlobalCatalogEntity[]>;
  updateExtendedGlobalCatalog(
    id: string,
    ExtendedGlobalCatalog: IExtendedGlobalCatalogEntity
  ): Promise<IExtendedGlobalCatalogEntity>;
  deleteExtendedGlobalCatalog(id: string): Promise<void>;
  filterExtendedGlobalCatalog(
    query: Object,
    filterType?: string | undefined,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IExtendedGlobalCatalogEntity[]>;
  bulkWrite(
    ExtendedGlobalCatalog: Partial<IExtendedGlobalCatalogEntity>[]
  ): Promise<void>;
  bulkDelete(ExtendedGlobalCatalog: Object): Promise<any>;
  updateMany(
    query: any,
    ExtendedGlobalCatalog: IExtendedGlobalCatalogEntity
  ): Promise<IExtendedGlobalCatalogEntity>;
  getExtendedGlobalCatalogCount(
    query: IExtendedGlobalCatalogEntity
  ): Promise<number>;
}

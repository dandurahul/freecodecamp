import { IIosCatalogueEntity } from "../../entities/catalogues/ios-catalogue.entity";

export interface IIosCatalogueRepository {
  createIosCatalogue(
    catalogue: IIosCatalogueEntity
  ): Promise<IIosCatalogueEntity>;
  getIosCatalogue(query: any): Promise<IIosCatalogueEntity>;
  getAllIosCatalogues(query: any): Promise<IIosCatalogueEntity[]>;
  updateIosCatalogue(
    id: string,
    catalogue: IIosCatalogueEntity
  ): Promise<IIosCatalogueEntity>;
  deleteIosCatalogue(id: string): Promise<void>;
  filterIosCatalogues(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<IIosCatalogueEntity[]>;
  createIosCatalogues(
    iosCatalogue: IIosCatalogueEntity[]
  ): Promise<IIosCatalogueEntity[]>;
  updateIosCatalogues(iosCatalogue: IIosCatalogueEntity[]): Promise<any>;
  filterByPagination(filterCriteria: any): Promise<any>;
  getProductCountBasedOnStores(filterCriteria: any): Promise<any>;
  updateBulkIosCatalogue(
    query: object,
    catalogueEntity: IIosCatalogueEntity
  ): Promise<IIosCatalogueEntity>;
  bulkInsert(
    iosCatalogue: IIosCatalogueEntity[]
  ): Promise<IIosCatalogueEntity[]>;
}

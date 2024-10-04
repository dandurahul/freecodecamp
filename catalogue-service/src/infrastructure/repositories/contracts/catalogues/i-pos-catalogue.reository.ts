import { IPosCatalogueEntity } from "../../entities/catalogues/pos-catalogue.entity";

export interface IPosCatalogueRepository {
  createPosCatalogue(
    catalogue: IPosCatalogueEntity
  ): Promise<IPosCatalogueEntity>;
  getPosCatalogue(query: any): Promise<IPosCatalogueEntity>;
  getAllPosCatalogues(query: any): Promise<IPosCatalogueEntity[]>;
  updatePosCatalogue(
    id: string,
    catalogue: IPosCatalogueEntity
  ): Promise<IPosCatalogueEntity>;
  deletePosCatalogue(id: string): Promise<void>;
  filterPosCatalogues(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<IPosCatalogueEntity[]>;
  createPosCatalogues(
    posCatalogue: IPosCatalogueEntity[]
  ): Promise<IPosCatalogueEntity[]>;
  updatePosCatalogues(posCatalogue: IPosCatalogueEntity[]): Promise<any>;
  filterByPagination(filterCriteria: any): Promise<any>;
  getProductCountBasedOnStores(filterCriteria: any): Promise<any>;
  updateBulkPosCatalogue(
    query: object,
    catalogueEntity: IPosCatalogueEntity
  ): Promise<IPosCatalogueEntity>;
  bulkInsert(
    storeCatalogue: IPosCatalogueEntity[]
  ): Promise<IPosCatalogueEntity[]>;
}

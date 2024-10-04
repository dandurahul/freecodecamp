import { PaginationModel } from "../../../../domain/models/pagination/pagination.model";
import { IGlobalCatalogueEntity } from "../../entities/catalogues/global-catalogues.entity";
import {
  ICategoriesProductCountEntity,
  IClassificationProductCountEntity,
  ISubCategoriesProductCountEntity,
} from "../../entities/helpers/categorization-product-count.entity";

export interface IGlobalCatalogueRepository {
  createGlobalCatalogue(
    catalogue: IGlobalCatalogueEntity
  ): Promise<IGlobalCatalogueEntity>;
  getGlobalCatalogue(query: any): Promise<IGlobalCatalogueEntity>;
  getAllGlobalCatalogues(
    query: any,
    fields?: string,
    populate?: string
  ): Promise<IGlobalCatalogueEntity[]>;
  updateGlobalCatalogue(
    id: string,
    catalogue: IGlobalCatalogueEntity
  ): Promise<IGlobalCatalogueEntity>;
  deleteGlobalCatalogue(id: string): Promise<void>;
  filterGlobalCatalogues(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number
  ): Promise<IGlobalCatalogueEntity[]>;
  groupByHighlightIds(
    highlightIds: string[],
    businessUnitId: string
  ): Promise<any>;
  getSuggestionsForSearchCriteria(
    filterCriteria: Object,
    filterType?: string
  ): Promise<IGlobalCatalogueEntity[]>;
  createGlobalCatalogues(
    globalCatalogue: IGlobalCatalogueEntity[]
  ): Promise<IGlobalCatalogueEntity[]>;
  updateGlobalCatalogues(globalCatalogue: any[]): Promise<any>;
  getProductCountsByCategory(
    filterCriteria: Object
  ): Promise<ICategoriesProductCountEntity[]>;
  getProductCountsBySubCategory(
    filterCriteria: Object
  ): Promise<ISubCategoriesProductCountEntity[]>;
  filterByPagination(filterCriteria: any): Promise<any>;
  updateBulkGlobalCatalogue(
    query: object,
    catalogueEntity: Partial<IGlobalCatalogueEntity>
  ): Promise<IGlobalCatalogueEntity>;
  getProductCountsByClassification(
    filterCriteria: Object
  ): Promise<IClassificationProductCountEntity[]>;
}

import { CategoryModel } from "../../../domain/models/catagories/category.model";
import { ClassificationModel } from "../../../domain/models/catagories/classification.model";
import { SubCategoryModel } from "../../../domain/models/catagories/sub-category.model";
import { GlobalCatalogueDetailsModel } from "../../../domain/models/catalogues/global-catalogue-details.model";
import { GlobalCatalogueModel } from "../../../domain/models/catalogues/global-catalogue.model";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";

export interface IGlobalCatalogueService {
  createGlobalCatalogue(
    globalCatalogue: GlobalCatalogueModel
  ): Promise<GlobalCatalogueModel>;

  getGlobalCatalogueById(_id: string): Promise<GlobalCatalogueDetailsModel>;
  getAllGlobalCatalogue(
    filterType: string,
    pageSize: number,
    page: number,
    filterCriteria: any
  ): Promise<GlobalCatalogueDetailsModel[]>;
  updateGlobalCatalogue(
    id: string,
    globalCatalogue: GlobalCatalogueModel
  ): Promise<GlobalCatalogueModel>;
  deleteGlobalCatalogue(id: string): Promise<void>;
  filterGlobalCatalogue(
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<GlobalCatalogueDetailsModel[]>;
  getSuggestionsForSearchCriteria(
    filterCriteria: Object,
    filterType: string
  ): Promise<CategoryModel[] | SubCategoryModel[] | ClassificationModel[]>;
  createGlobalCatalogues(
    globalCatalogues: GlobalCatalogueDetailsModel[]
  ): Promise<GlobalCatalogueDetailsModel[]>;
  updateGlobalCatalogues(
    globalCatalogues: GlobalCatalogueModel[]
  ): Promise<GlobalCatalogueModel[]>;
  filterByPagination(
    filterCriteria: any,
    pageSize?: number,
    page?: number
  ): Promise<PaginationModel>;
  updateBulkStoreCatalogue(
    query: object,
    catalogueEntity: GlobalCatalogueModel
  ): Promise<GlobalCatalogueModel>;
  updateBulkVarinats(
    catalogueEntity: GlobalCatalogueModel[],
    filterType: any
  ): Promise<any>;
  updateBulkCatalogProduct(
    catalogueEntity: GlobalCatalogueModel[]
  ): Promise<any>;
  
}

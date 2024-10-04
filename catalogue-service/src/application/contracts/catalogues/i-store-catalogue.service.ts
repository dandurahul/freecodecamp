import { StoreCatalogueFilterModel } from "../../../api/models/store-catalogue-product-filter.model";
import { StoreCatalogueDetailsModel } from "../../../domain/models/catalogues/store-catalogue-details.model";
import { StoreCatalogueVariantModel } from "../../../domain/models/catalogues/store-catalogue-variants.model";
import { StoreCatalogueModel } from "../../../domain/models/catalogues/store-catalogue.model";
import { VariantRequestModel } from "../../../domain/models/catalogues/variant-update-request.model";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";

export interface IStoreCatalogueService {
  createStoreCatalogue(
    StoreCatalogue: StoreCatalogueModel
  ): Promise<StoreCatalogueModel>;
  createStoreCatalogueProducts(
    entityInternalId: string,
    productIds: string[],
    businessUnitId: string
  ): Promise<StoreCatalogueModel>;

  getStoreCatalogueById(_id: string): Promise<StoreCatalogueDetailsModel>;
  getStoreProduct(
    query: Object,
    filterType: string | undefined
  ): Promise<StoreCatalogueDetailsModel>;
  getStoreCatalogues(
    filerType: string,
    pageSize: number,
    page: number
  ): Promise<StoreCatalogueDetailsModel[]>;
  updateStoreCatalogue(
    _id: string,
    storeCatalogue: StoreCatalogueModel
  ): Promise<StoreCatalogueModel>;
  deleteStoreCatalogue(id: string): Promise<void>;
  filterStoreCatalogue(
    filterType: string,
    filterCriteria: Object,
    pageSize: number,
    page: number
  ): Promise<StoreCatalogueDetailsModel[]>;
  createStoreCatalogues(
    storeCatalogues: StoreCatalogueModel[]
  ): Promise<StoreCatalogueModel[]>;
  updateStoreCatalogues(
    storeCatalogues: StoreCatalogueModel[]
  ): Promise<StoreCatalogueModel[]>;
  filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel>;
  updateStoreCatalogueProducts(
    query: object,
    catalogueEntity: StoreCatalogueModel
  ): Promise<StoreCatalogueModel>;
  filterActiveStoreCatalogueProducts(
    entityInternalId: string,
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number,
    extendedCatalogFlag: boolean
  ): Promise<StoreCatalogueDetailsModel[]>;

  updateProductVariants(requestObject: {
    storeProducts: VariantRequestModel[];
  }): Promise<StoreCatalogueVariantModel[]>;

  updateStoreCatalogueVariants(
    storeCatalogueEntity: StoreCatalogueModel[],
    filterType: string
  ): Promise<any>;
  filterStoreCatalogueVariants(
    filterCriteria: any,
    filterType: any,
    pageSize: any,
    page: any
  ): Promise<any>;
}

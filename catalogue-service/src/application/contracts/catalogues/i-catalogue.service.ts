import { StoreCatalogueDetailsModel } from "../../../domain/models/catalogues/store-catalogue-details.model";
import { StoreCatalogueVariantModel } from "../../../domain/models/catalogues/store-catalogue-variants.model";
import { VariantRequestModel } from "../../../domain/models/catalogues/variant-update-request.model";
import { CatalogueModel } from "../../../domain/models/catalogues/catalogue.model";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";

export interface ICatalogueService {
  createCatalogue(StoreCatalogue: CatalogueModel): Promise<CatalogueModel>;
  createCatalogueProducts(
    entityInternalId: string,
    productIds: string[]
  ): Promise<CatalogueModel>;

  getCatalogueById(_id: string): Promise<StoreCatalogueDetailsModel>;
  getCatalogueProduct(
    query: Object,
    filterType: string | undefined
  ): Promise<StoreCatalogueDetailsModel>;
  getCatalogues(
    filerType: string,
    pageSize: number,
    page: number
  ): Promise<StoreCatalogueDetailsModel[]>;
  updateCatalogue(
    _id: string,
    storeCatalogue: CatalogueModel
  ): Promise<CatalogueModel>;
  deleteCatalogue(id: string): Promise<void>;
  filterCatalogue(
    filterType: string,
    filterCriteria: Object,
    pageSize: number,
    page: number
  ): Promise<StoreCatalogueDetailsModel[]>;
  createCatalogues(
    storeCatalogues: CatalogueModel[]
  ): Promise<CatalogueModel[]>;
  updateCatalogues(
    storeCatalogues: CatalogueModel[]
  ): Promise<CatalogueModel[]>;
  filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel>;
  updateCatalogueProducts(
    query: object,
    catalogueEntity: CatalogueModel
  ): Promise<CatalogueModel>;
  filterActiveCatalogueProducts(
    entityInternalId: string,
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number,
    extendedCatalogFlag: boolean
  ): Promise<StoreCatalogueDetailsModel[]>;

  updateProductVariants(requestObject: {
    products: VariantRequestModel[];
  }): Promise<StoreCatalogueVariantModel[]>;

  updateCatalogueVariants(storeCatalogueEntity: CatalogueModel[]): Promise<any>;
}

import { UnavailableProductModel } from "../../../domain/models/catalogues/unavailable-products.model";

export interface IUnavailableProductsService {
  filterUnavailableProducts(
    query: any,
    filterType: string | undefined,
    page: number,
    pageSize: number
  ): Promise<UnavailableProductModel[]>;
  createUnavailableProducts(
    UnavailableProductsModels: UnavailableProductModel[]
  ): Promise<UnavailableProductModel[]>;
}

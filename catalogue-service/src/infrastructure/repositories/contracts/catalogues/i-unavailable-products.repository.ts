import { IUnavailableProductsEntity } from "../../entities/catalogues/unavailable-products.entity";

export interface IUnavailableProductsRepository {
  createUnavailableProducts(
    UnavailableProductsEntity: IUnavailableProductsEntity[]
  ): Promise<IUnavailableProductsEntity[]>;
  filterUnavailableProducts(
    filterCriteria: Object,
    filterType?: string | undefined,
    page?: number,
    pageSize?: number
  ): Promise<IUnavailableProductsEntity[]>;
  deleteUnavailableProducts(
    filterCriteria: Object,
  ): Promise<any> 
}

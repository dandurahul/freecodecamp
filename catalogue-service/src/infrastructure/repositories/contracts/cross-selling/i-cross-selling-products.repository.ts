import { ICrossSellingProductsEntity } from "../../entities/cross-selling/cross-selling-products.entity";

export interface ICrossSellingProductsRepository {
  createCrossSellingProduct(
    crossSellingProductEntity: ICrossSellingProductsEntity
  ): Promise<ICrossSellingProductsEntity>;
  getCrossSellingProductById(
    query: any,
    populate?: string
  ): Promise<ICrossSellingProductsEntity>;
  getAllCrossSellingProducts(
    filterType:string| undefined
  ): Promise<ICrossSellingProductsEntity[]>;
  updateCrossSellingProduct(
    id: string,
    crossSellingProductEntity: ICrossSellingProductsEntity
  ): Promise<ICrossSellingProductsEntity>;
  deleteCrossSellingProduct(id: string): Promise<void>;
  filterCrossSellingProducts(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<ICrossSellingProductsEntity[]>;
  filterByPagination(
    query: Object,
    pageSize?: number,
    page?: number
  ): Promise<any>;
}

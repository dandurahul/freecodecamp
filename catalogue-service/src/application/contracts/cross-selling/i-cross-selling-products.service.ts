import { CrossSellingProductsModel } from "../../../domain/models/cross-selling/cross-selling-products.model";

export interface ICrossSellingProductService {
  createCrossSellingProduct(
    reservedQuantity: CrossSellingProductsModel
  ): Promise<CrossSellingProductsModel>;
  getAllCrossSellingProducts(
    filterType:string| undefined
  ): Promise<CrossSellingProductsModel[]>;
  getCrossSellingProductById(
    filterCriteria: Object,
    filterType?: string
  ): Promise<CrossSellingProductsModel>;
  updateCrossSellingProduct(
    _id: string,
    reservedQuantity: CrossSellingProductsModel
  ): Promise<CrossSellingProductsModel>;
  deleteCrossSellingProduct(id: string): Promise<void>;
  filterCrossSellingProducts(
    filterCriteria: Object,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<CrossSellingProductsModel[]>;
}

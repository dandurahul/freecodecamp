import { ProductExemptionModel } from "../../../domain/models/exemptions/product-exemption.model";

export interface IProductExemptionsService {
  createProductExemption(
    reservedQuantity: ProductExemptionModel
  ): Promise<ProductExemptionModel>;
  getAllProductExemptions(
    filterType: string,
    activeFlag: string
  ): Promise<ProductExemptionModel[]>;
  getProductExemptionById(filterType: string): Promise<ProductExemptionModel>;
  updateProductExemption(
    _id: string,
    reservedQuantity: ProductExemptionModel
  ): Promise<ProductExemptionModel>;
  deleteProductExemption(id: string): Promise<void>;
  filterProductExemptions(
    filterCriteria: Object,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<ProductExemptionModel[]>;
}

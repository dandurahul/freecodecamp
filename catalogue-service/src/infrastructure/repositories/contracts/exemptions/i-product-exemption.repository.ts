import { IProductExemptionEntity } from "../../entities/exemptions/product-exemptions.entity";

export interface IProductExemptionRepository {
  createProductExemption(
    productExemptionEntity: IProductExemptionEntity
  ): Promise<IProductExemptionEntity>;
  getProductExemptionById(
    query: any,
    populate?: string
  ): Promise<IProductExemptionEntity>;
  getAllProductExemptions(
    filterType: string,
    activeFlag: string
  ): Promise<IProductExemptionEntity[]>;
  updateProductExemption(
    id: string,
    productExemptionEntity: IProductExemptionEntity
  ): Promise<IProductExemptionEntity>;
  deleteProductExemption(id: string): Promise<void>;
  filterProductExemptions(
    query: Object,
    fields?: string,
    filterType?: string| undefined,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IProductExemptionEntity[]>;
  filterByPagination(
    query: Object,
    pageSize?: number,
    page?: number
  ): Promise<any>;
}

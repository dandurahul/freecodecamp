import { IIosCataloguePurchaseVariantEntity } from "../../entities/catalogues/ios-purchase-variants.entity";

export interface IIosCataloguePurchaseVariantRepository {
  createIosCataloguePurchaseVariant(
    variant: IIosCataloguePurchaseVariantEntity
  ): Promise<IIosCataloguePurchaseVariantEntity>;
  getIosCataloguePurchaseVariant(
    query: any
  ): Promise<IIosCataloguePurchaseVariantEntity>;
  getAllIosCataloguePurchaseVariants(
    query: any
  ): Promise<IIosCataloguePurchaseVariantEntity[]>;
  updateIosCataloguePurchaseVariants(
    id: string,
    variant: IIosCataloguePurchaseVariantEntity
  ): Promise<IIosCataloguePurchaseVariantEntity>;
  deleteIosCataloguePurchaseVariants(id: string): Promise<void>;
  filterIosCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IIosCataloguePurchaseVariantEntity[]>;
  bulkInsert(
    variants: IIosCataloguePurchaseVariantEntity[]
  ): Promise<IIosCataloguePurchaseVariantEntity[]>;
  bulkWrite(variants: IIosCataloguePurchaseVariantEntity[]): Promise<any>;
}

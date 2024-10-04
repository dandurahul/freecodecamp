import { IStoreCataloguePurchaseVariantEntity } from '../../entities/catalogues/store-purchase-variants.entity';

export interface IStoreCataloguePurchaseVariantRepository {
  createStoreCataloguePurchaseVariant(
    variant: IStoreCataloguePurchaseVariantEntity
  ): Promise<IStoreCataloguePurchaseVariantEntity>;
  getStoreCataloguePurchaseVariant(
    query: any
  ): Promise<IStoreCataloguePurchaseVariantEntity>;
  getAllStoreCataloguePurchaseVariants(
    query: any
  ): Promise<IStoreCataloguePurchaseVariantEntity[]>;
  updateStoreCataloguePurchaseVariants(
    id: string,
    variant: IStoreCataloguePurchaseVariantEntity
  ): Promise<IStoreCataloguePurchaseVariantEntity>;
  deleteStoreCataloguePurchaseVariants(id: string): Promise<void>;
  filterStoreCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IStoreCataloguePurchaseVariantEntity[]>;
  bulkInsert(
    variants: IStoreCataloguePurchaseVariantEntity[]
  ): Promise<IStoreCataloguePurchaseVariantEntity[]>;
  bulkWrite(variants: IStoreCataloguePurchaseVariantEntity[]): Promise<any>;
}

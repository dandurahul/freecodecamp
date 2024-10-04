import { IMobileCataloguePurchaseVariantEntity } from "../../entities/catalogues/mobile-purchase-variants.entity";

export interface IMobileCataloguePurchaseVariantRepository {
  createMobileCataloguePurchaseVariant(
    variant: IMobileCataloguePurchaseVariantEntity
  ): Promise<IMobileCataloguePurchaseVariantEntity>;
  getMobileCataloguePurchaseVariant(
    query: any
  ): Promise<IMobileCataloguePurchaseVariantEntity>;
  getAllMobileCataloguePurchaseVariants(
    query: any
  ): Promise<IMobileCataloguePurchaseVariantEntity[]>;
  updateMobileCataloguePurchaseVariants(
    id: string,
    variant: IMobileCataloguePurchaseVariantEntity
  ): Promise<IMobileCataloguePurchaseVariantEntity>;
  deleteMobileCataloguePurchaseVariants(id: string): Promise<void>;
  filterMobileCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IMobileCataloguePurchaseVariantEntity[]>;
  bulkInsert(
    variants: IMobileCataloguePurchaseVariantEntity[]
  ): Promise<IMobileCataloguePurchaseVariantEntity[]>;
  bulkWrite(variants: IMobileCataloguePurchaseVariantEntity[]): Promise<any>;
}

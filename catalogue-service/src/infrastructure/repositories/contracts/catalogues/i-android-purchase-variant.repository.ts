import { IAndroidCataloguePurchaseVariantEntity } from "../../entities/catalogues/android-catalogue-purchase-variant.entity";

export interface IAndroidCataloguePurchaseVariantRepository {
  createAndroidCataloguePurchaseVariant(
    variant: IAndroidCataloguePurchaseVariantEntity
  ): Promise<IAndroidCataloguePurchaseVariantEntity>;
  getAndroidCataloguePurchaseVariant(
    query: any
  ): Promise<IAndroidCataloguePurchaseVariantEntity>;
  getAllAndroidCataloguePurchaseVariants(
    query: any
  ): Promise<IAndroidCataloguePurchaseVariantEntity[]>;
  updateAndroidCataloguePurchaseVariants(
    id: string,
    variant: IAndroidCataloguePurchaseVariantEntity
  ): Promise<IAndroidCataloguePurchaseVariantEntity>;
  deleteAndroidCataloguePurchaseVariants(id: string): Promise<void>;
  filterAndroidCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IAndroidCataloguePurchaseVariantEntity[]>;
  bulkInsert(
    variants: IAndroidCataloguePurchaseVariantEntity[]
  ): Promise<IAndroidCataloguePurchaseVariantEntity[]>;
  bulkWrite(variants: IAndroidCataloguePurchaseVariantEntity[]): Promise<any>;
}

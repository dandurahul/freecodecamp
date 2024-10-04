import { IGlobalCataloguePurchaseVariantEntity } from '../../entities/catalogues/global-purchase-variants.entity';

export interface IGlobalCataloguePurchaseVariantRepository {
  createGlobalCataloguePurchaseVariant(
    variant: IGlobalCataloguePurchaseVariantEntity
  ): Promise<IGlobalCataloguePurchaseVariantEntity>;
  getGlobalCataloguePurchaseVariant(
    query: any
  ): Promise<IGlobalCataloguePurchaseVariantEntity>;
  getAllGlobalCataloguePurchaseVariants(
    query: any
  ): Promise<IGlobalCataloguePurchaseVariantEntity[]>;
  updateGlobalCataloguePurchaseVariants(
    id: string,
    variant: IGlobalCataloguePurchaseVariantEntity
  ): Promise<IGlobalCataloguePurchaseVariantEntity>;
  deleteGlobalCataloguePurchaseVariants(id: string): Promise<void>;
  filterGlobalCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IGlobalCataloguePurchaseVariantEntity[]>;
  bulkInsert(
    variants: IGlobalCataloguePurchaseVariantEntity[]
  ): Promise<IGlobalCataloguePurchaseVariantEntity[]>;
  bulkWrite(variants: IGlobalCataloguePurchaseVariantEntity[]): Promise<any>;
}

import { IWebCataloguePurchaseVariantEntity } from "../../entities/catalogues/web-purchase-variants.entity";

export interface IWebCataloguePurchaseVariantRepository {
  createWebCataloguePurchaseVariant(
    variant: IWebCataloguePurchaseVariantEntity
  ): Promise<IWebCataloguePurchaseVariantEntity>;
  getWebCataloguePurchaseVariant(
    query: any
  ): Promise<IWebCataloguePurchaseVariantEntity>;
  getAllWebCataloguePurchaseVariants(
    query: any
  ): Promise<IWebCataloguePurchaseVariantEntity[]>;
  updateWebCataloguePurchaseVariants(
    id: string,
    variant: IWebCataloguePurchaseVariantEntity
  ): Promise<IWebCataloguePurchaseVariantEntity>;
  deleteWebCataloguePurchaseVariants(id: string): Promise<void>;
  filterWebCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IWebCataloguePurchaseVariantEntity[]>;
  bulkInsert(
    variants: IWebCataloguePurchaseVariantEntity[]
  ): Promise<IWebCataloguePurchaseVariantEntity[]>;
  bulkWrite(variants: IWebCataloguePurchaseVariantEntity[]): Promise<any>;
}

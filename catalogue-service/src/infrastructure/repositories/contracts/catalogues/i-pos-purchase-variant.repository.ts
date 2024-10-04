import { IPosCataloguePurchaseVariantEntity } from "../../entities/catalogues/pos-purchase-variants.entity";

export interface IPosCataloguePurchaseVariantRepository {
  createPosCataloguePurchaseVariant(
    variant: IPosCataloguePurchaseVariantEntity
  ): Promise<IPosCataloguePurchaseVariantEntity>;
  getPosCataloguePurchaseVariant(
    query: any
  ): Promise<IPosCataloguePurchaseVariantEntity>;
  getAllPosCataloguePurchaseVariants(
    query: any
  ): Promise<IPosCataloguePurchaseVariantEntity[]>;
  updatePosCataloguePurchaseVariants(
    id: string,
    variant: IPosCataloguePurchaseVariantEntity
  ): Promise<IPosCataloguePurchaseVariantEntity>;
  deletePosCataloguePurchaseVariants(id: string): Promise<void>;
  filterPosCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IPosCataloguePurchaseVariantEntity[]>;
  bulkInsert(
    variants: IPosCataloguePurchaseVariantEntity[]
  ): Promise<IPosCataloguePurchaseVariantEntity[]>;
  bulkWrite(variants: IPosCataloguePurchaseVariantEntity[]): Promise<any>;
}

import { IStoreCatalogueVariantEntity } from "../../entities/catalogues/store-catalogue-variants.entity";

export interface IStoreCatalogueVariantRepository {
  createStoreCatalogueVariant(
    variant: IStoreCatalogueVariantEntity
  ): Promise<IStoreCatalogueVariantEntity>;
  getStoreCatalogueVariant(query: any): Promise<IStoreCatalogueVariantEntity>;
  getAllStoreCatalogueVariants(
    query: any
  ): Promise<IStoreCatalogueVariantEntity[]>;
  updateStoreCatalogueVariant(
    id: string | undefined,
    variant: Partial<IStoreCatalogueVariantEntity>
  ): Promise<IStoreCatalogueVariantEntity>;
  deleteStoreCatalogueVariant(id: string): Promise<void>;
  filterStoreCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IStoreCatalogueVariantEntity[]>;
  bulkInsert(
    variants: IStoreCatalogueVariantEntity[]
  ): Promise<IStoreCatalogueVariantEntity[]>;
  bulkWrite(variants: any): Promise<any>;
  bulkUpsert(variants: any[]): Promise<any>;
  bulkWriteForReservedQuantity(
    variants: IStoreCatalogueVariantEntity[]
  ): Promise<any>;
}

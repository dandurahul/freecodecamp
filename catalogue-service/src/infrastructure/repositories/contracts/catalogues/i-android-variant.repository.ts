import { IAndroidCatalogueVariantEntity } from "../../entities/catalogues/android-catalogue-variant.entity";

export interface IAndroidCatalogueVariantRepository {
  createAndroidCatalogueVariant(
    variant: IAndroidCatalogueVariantEntity
  ): Promise<IAndroidCatalogueVariantEntity>;
  getAndroidCatalogueVariant(
    query: any
  ): Promise<IAndroidCatalogueVariantEntity>;
  getAllAndroidCatalogueVariants(
    query: any
  ): Promise<IAndroidCatalogueVariantEntity[]>;
  updateAndroidCatalogueVariant(
    id: string | undefined,
    variant: Partial<IAndroidCatalogueVariantEntity>
  ): Promise<IAndroidCatalogueVariantEntity>;
  deleteAndroidCatalogueVariant(id: string): Promise<void>;
  filterAndroidCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IAndroidCatalogueVariantEntity[]>;
  bulkInsert(
    variants: IAndroidCatalogueVariantEntity[]
  ): Promise<IAndroidCatalogueVariantEntity[]>;
  bulkWrite(variants: IAndroidCatalogueVariantEntity[]): Promise<any>;
  bulkWriteForReservedQuantity(
    variants: IAndroidCatalogueVariantEntity[]
  ): Promise<any>;
}

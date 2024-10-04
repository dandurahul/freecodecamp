import { IMobileCatalogueVariantEntity } from "../../entities/catalogues/mobile.catalogue-variants.entity";

export interface IMobileCatalogueVariantRepository {
  createMobileCatalogueVariant(
    variant: IMobileCatalogueVariantEntity
  ): Promise<IMobileCatalogueVariantEntity>;
  getMobileCatalogueVariant(query: any): Promise<IMobileCatalogueVariantEntity>;
  getAllMobileCatalogueVariants(
    query: any
  ): Promise<IMobileCatalogueVariantEntity[]>;
  updateMobileCatalogueVariant(
    id: string | undefined,
    variant: Partial<IMobileCatalogueVariantEntity>
  ): Promise<IMobileCatalogueVariantEntity>;
  deleteMobileCatalogueVariant(id: string): Promise<void>;
  filterMobileCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IMobileCatalogueVariantEntity[]>;
  bulkInsert(
    variants: IMobileCatalogueVariantEntity[]
  ): Promise<IMobileCatalogueVariantEntity[]>;
  bulkWrite(variants: IMobileCatalogueVariantEntity[]): Promise<any>;
  bulkWriteForReservedQuantity(
    variants: IMobileCatalogueVariantEntity[]
  ): Promise<any>;
}

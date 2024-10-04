import { IGlobalCatalogueVariantEntity } from '../../entities/catalogues/global-catalogue-variants.entity';

export interface IGlobalCatalogueVariantRepository {
  createGlobalCatalogueVariant(
    variant: IGlobalCatalogueVariantEntity
  ): Promise<IGlobalCatalogueVariantEntity>;
  getGlobalCatalogueVariant(query: any): Promise<IGlobalCatalogueVariantEntity>;
  getAllGlobalCatalogueVariants(
    query: any
  ): Promise<IGlobalCatalogueVariantEntity[]>;
  updateGlobalCatalogueVariant(
    id: string,
    variant: IGlobalCatalogueVariantEntity
  ): Promise<IGlobalCatalogueVariantEntity>;
  deleteGlobalCatalogueVariant(id: string): Promise<void>;
  filterGlobalCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IGlobalCatalogueVariantEntity[]>;
  bulkInsert(
    variants: IGlobalCatalogueVariantEntity[]
  ): Promise<IGlobalCatalogueVariantEntity[]>;
  bulkWrite(variants: any[]): Promise<any>;
  bulkWriteById(variants: any[]): Promise<any>;
}

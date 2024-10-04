import { IWebCatalogueVariantEntity } from "../../entities/catalogues/web-catalogue-variants.entity";

export interface IWebCatalogueVariantRepository {
  createWebCatalogueVariant(
    variant: IWebCatalogueVariantEntity
  ): Promise<IWebCatalogueVariantEntity>;
  getWebCatalogueVariant(query: any): Promise<IWebCatalogueVariantEntity>;
  getAllWebCatalogueVariants(query: any): Promise<IWebCatalogueVariantEntity[]>;
  updateWebCatalogueVariant(
    id: string | undefined,
    variant: Partial<IWebCatalogueVariantEntity>
  ): Promise<IWebCatalogueVariantEntity>;
  deleteWebCatalogueVariant(id: string): Promise<void>;
  filterWebCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IWebCatalogueVariantEntity[]>;
  bulkInsert(
    variants: IWebCatalogueVariantEntity[]
  ): Promise<IWebCatalogueVariantEntity[]>;
  bulkWrite(variants: IWebCatalogueVariantEntity[]): Promise<any>;
  bulkWriteForReservedQuantity(
    variants: IWebCatalogueVariantEntity[]
  ): Promise<any>;
}

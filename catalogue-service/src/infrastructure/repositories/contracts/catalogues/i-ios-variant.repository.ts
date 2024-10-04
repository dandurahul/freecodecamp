import { IIosCatalogueVariantEntity } from "../../entities/catalogues/ios-catalogue-variants.entity";

export interface IIosCatalogueVariantRepository {
  createIosCatalogueVariant(
    variant: IIosCatalogueVariantEntity
  ): Promise<IIosCatalogueVariantEntity>;
  getIosCatalogueVariant(query: any): Promise<IIosCatalogueVariantEntity>;
  getAllIosCatalogueVariants(query: any): Promise<IIosCatalogueVariantEntity[]>;
  updateIosCatalogueVariant(
    id: string | undefined,
    variant: Partial<IIosCatalogueVariantEntity>
  ): Promise<IIosCatalogueVariantEntity>;
  deleteIosCatalogueVariant(id: string): Promise<void>;
  filterIosCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IIosCatalogueVariantEntity[]>;
  bulkInsert(
    variants: IIosCatalogueVariantEntity[]
  ): Promise<IIosCatalogueVariantEntity[]>;
  bulkWrite(variants: IIosCatalogueVariantEntity[]): Promise<any>;
  bulkWriteForReservedQuantity(
    variants: IIosCatalogueVariantEntity[]
  ): Promise<any>;
}

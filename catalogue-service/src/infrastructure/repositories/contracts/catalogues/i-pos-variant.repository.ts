import { IPosCatalogueVariantEntity } from "../../entities/catalogues/pos-catalogue-varint.entity";

export interface IPosCatalogueVariantRepository {
  createPosCatalogueVariant(
    variant: IPosCatalogueVariantEntity
  ): Promise<IPosCatalogueVariantEntity>;
  getPosCatalogueVariant(query: any): Promise<IPosCatalogueVariantEntity>;
  getAllPosCatalogueVariants(query: any): Promise<IPosCatalogueVariantEntity[]>;
  updatePosCatalogueVariant(
    id: string | undefined,
    variant: Partial<IPosCatalogueVariantEntity>
  ): Promise<IPosCatalogueVariantEntity>;
  deletePosCatalogueVariant(id: string): Promise<void>;
  filterPosCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IPosCatalogueVariantEntity[]>;
  bulkInsert(
    variants: IPosCatalogueVariantEntity[]
  ): Promise<IPosCatalogueVariantEntity[]>;
  bulkWrite(variants: IPosCatalogueVariantEntity[]): Promise<any>;
  bulkWriteForReservedQuantity(
    variants: IPosCatalogueVariantEntity[]
  ): Promise<any>;
}

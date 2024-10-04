import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IWebCatalogueVariantEntity } from "../../entities/catalogues/web-catalogue-variants.entity";
import { IPosCatalogueVariantRepository } from "../../contracts/catalogues/i-pos-variant.repository";
import { IPosCatalogueVariantEntity } from "../../entities/catalogues/pos-catalogue-varint.entity";

@injectable()
class PosCatalogueVariantRepository implements IPosCatalogueVariantRepository {
  @inject(ContainerTypes.PosCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IPosCatalogueVariantEntity>;

  async createPosCatalogueVariant(
    catalogueVariant: IPosCatalogueVariantEntity
  ): Promise<IPosCatalogueVariantEntity> {
    return this.repositoryBase.create(catalogueVariant);
  }

  async getPosCatalogueVariant(
    query: any
  ): Promise<IPosCatalogueVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllPosCatalogueVariants(
    query: any
  ): Promise<IPosCatalogueVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updatePosCatalogueVariant(
    id: string,
    catalogueVariant: IPosCatalogueVariantEntity
  ): Promise<IPosCatalogueVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogueVariant
    )) as IPosCatalogueVariantEntity;
  }
  async deletePosCatalogueVariant(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterPosCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IPosCatalogueVariantEntity[]> {
    return this.repositoryBase.filter(
      query,
      fields,
      populate,
      aggregate,
      pageSize,
      page,
      sort
    );
  }
  bulkInsert(
    variants: IPosCatalogueVariantEntity[]
  ): Promise<IPosCatalogueVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
  bulkWriteForReservedQuantity(bulkEntities: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default PosCatalogueVariantRepository;

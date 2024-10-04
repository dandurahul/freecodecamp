import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IStoreCatalogueVariantRepository } from "../../contracts/catalogues/i-store-catalogue-variant.repository";
import { IStoreCatalogueVariantEntity } from "../../entities/catalogues/store-catalogue-variants.entity";
import {
  buildQueryForBulkWrite,
  buildQueryForVariantViaItemCode,
} from "../../builders/query.builder";

@injectable()
class StoreCatalogueVariantRepository
  implements IStoreCatalogueVariantRepository
{
  @inject(ContainerTypes.StoreCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IStoreCatalogueVariantEntity>;

  async createStoreCatalogueVariant(
    catalogueVariant: IStoreCatalogueVariantEntity
  ): Promise<IStoreCatalogueVariantEntity> {
    return this.repositoryBase.create(catalogueVariant);
  }

  async getStoreCatalogueVariant(
    query: any
  ): Promise<IStoreCatalogueVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllStoreCatalogueVariants(
    query: any
  ): Promise<IStoreCatalogueVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateStoreCatalogueVariant(
    id: string,
    catalogueVariant: Partial<IStoreCatalogueVariantEntity>
  ): Promise<IStoreCatalogueVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogueVariant
    )) as IStoreCatalogueVariantEntity;
  }
  async deleteStoreCatalogueVariant(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterStoreCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IStoreCatalogueVariantEntity[]> {
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
    variants: IStoreCatalogueVariantEntity[]
  ): Promise<IStoreCatalogueVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }

  bulkUpsert(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForVariantViaItemCode(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }

  bulkWriteForReservedQuantity(bulkEntities: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default StoreCatalogueVariantRepository;

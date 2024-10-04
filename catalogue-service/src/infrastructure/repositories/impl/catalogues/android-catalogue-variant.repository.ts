import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IAndroidCatalogueVariantRepository } from "../../contracts/catalogues/i-android-variant.repository";
import { IAndroidCatalogueVariantEntity } from "../../entities/catalogues/android-catalogue-variant.entity";

@injectable()
class AndroidCatalogueVariantRepository
  implements IAndroidCatalogueVariantRepository
{
  @inject(ContainerTypes.AndroidCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IAndroidCatalogueVariantEntity>;

  async createAndroidCatalogueVariant(
    catalogueVariant: IAndroidCatalogueVariantEntity
  ): Promise<IAndroidCatalogueVariantEntity> {
    return this.repositoryBase.create(catalogueVariant);
  }

  async getAndroidCatalogueVariant(
    query: any
  ): Promise<IAndroidCatalogueVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllAndroidCatalogueVariants(
    query: any
  ): Promise<IAndroidCatalogueVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateAndroidCatalogueVariant(
    id: string,
    catalogueVariant: IAndroidCatalogueVariantEntity
  ): Promise<IAndroidCatalogueVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogueVariant
    )) as IAndroidCatalogueVariantEntity;
  }
  async deleteAndroidCatalogueVariant(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterAndroidCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IAndroidCatalogueVariantEntity[]> {
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
    variants: IAndroidCatalogueVariantEntity[]
  ): Promise<IAndroidCatalogueVariantEntity[]> {
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
export default AndroidCatalogueVariantRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IGlobalCatalogueVariantRepository } from "../../contracts/catalogues/i-global-catalogue-variant.repository";
import GlobalCatalogueVariant, { IGlobalCatalogueVariantEntity } from "../../entities/catalogues/global-catalogue-variants.entity";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import {
  buildQueryForBulkWrite,
  buildQueryForGlobalCatalogBulkWrite,
} from "../../builders/query.builder";

@injectable()
class GlobalCatalogueVariantRepository
  implements IGlobalCatalogueVariantRepository
{
  @inject(ContainerTypes.GlobalCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IGlobalCatalogueVariantEntity>;

  async createGlobalCatalogueVariant(
    catalogueVariant: IGlobalCatalogueVariantEntity
  ): Promise<IGlobalCatalogueVariantEntity> {
    return this.repositoryBase.create(catalogueVariant);
  }

  async getGlobalCatalogueVariant(
    query: any
  ): Promise<IGlobalCatalogueVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllGlobalCatalogueVariants(
    query: any
  ): Promise<IGlobalCatalogueVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateGlobalCatalogueVariant(
    id: string,
    catalogueVariant: IGlobalCatalogueVariantEntity
  ): Promise<IGlobalCatalogueVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogueVariant
    )) as IGlobalCatalogueVariantEntity;
  }
  async deleteGlobalCatalogueVariant(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterGlobalCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IGlobalCatalogueVariantEntity[]> {
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
    variants: IGlobalCatalogueVariantEntity[]
  ): Promise<IGlobalCatalogueVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForGlobalCatalogBulkWrite(variants);
    return GlobalCatalogueVariant.bulkWrite(bulkEntities);
    // return this.repositoryBase.bulkWrite(bulkEntities);
  }
  bulkWriteById(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default GlobalCatalogueVariantRepository;

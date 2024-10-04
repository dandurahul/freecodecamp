import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";

import { IWebCatalogueVariantRepository } from "../../contracts/catalogues/i-web-variant.repository";
import { IWebCatalogueVariantEntity } from "../../entities/catalogues/web-catalogue-variants.entity";

@injectable()
class WebCatalogueVariantRepository implements IWebCatalogueVariantRepository {
  @inject(ContainerTypes.WebCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IWebCatalogueVariantEntity>;

  async createWebCatalogueVariant(
    catalogueVariant: IWebCatalogueVariantEntity
  ): Promise<IWebCatalogueVariantEntity> {
    return this.repositoryBase.create(catalogueVariant);
  }

  async getWebCatalogueVariant(
    query: any
  ): Promise<IWebCatalogueVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllWebCatalogueVariants(
    query: any
  ): Promise<IWebCatalogueVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateWebCatalogueVariant(
    id: string,
    catalogueVariant: IWebCatalogueVariantEntity
  ): Promise<IWebCatalogueVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogueVariant
    )) as IWebCatalogueVariantEntity;
  }
  async deleteWebCatalogueVariant(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterWebCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IWebCatalogueVariantEntity[]> {
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
    variants: IWebCatalogueVariantEntity[]
  ): Promise<IWebCatalogueVariantEntity[]> {
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
export default WebCatalogueVariantRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IStoreCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-store-purchase-variant.repository";
import { IStoreCataloguePurchaseVariantEntity } from "../../entities/catalogues/store-purchase-variants.entity";
import { buildQueryForBulkWrite } from "../../builders/query.builder";

@injectable()
class StoreCataloguePurchaseVariantRepository
  implements IStoreCataloguePurchaseVariantRepository
{
  @inject(ContainerTypes.StoreCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IStoreCataloguePurchaseVariantEntity>;

  async createStoreCataloguePurchaseVariant(
    cataloguePurchaseVariant: IStoreCataloguePurchaseVariantEntity
  ): Promise<IStoreCataloguePurchaseVariantEntity> {
    return this.repositoryBase.create(cataloguePurchaseVariant);
  }

  async getStoreCataloguePurchaseVariant(
    query: any
  ): Promise<IStoreCataloguePurchaseVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllStoreCataloguePurchaseVariants(
    query: any
  ): Promise<IStoreCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateStoreCataloguePurchaseVariants(
    id: string,
    cataloguePurchaseVariant: IStoreCataloguePurchaseVariantEntity
  ): Promise<IStoreCataloguePurchaseVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      cataloguePurchaseVariant
    )) as IStoreCataloguePurchaseVariantEntity;
  }
  async deleteStoreCataloguePurchaseVariants(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterStoreCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IStoreCataloguePurchaseVariantEntity[]> {
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
    variants: IStoreCataloguePurchaseVariantEntity[]
  ): Promise<IStoreCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default StoreCataloguePurchaseVariantRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IMobileCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-mobile-purchase-variant.repository";
import { IMobileCataloguePurchaseVariantEntity } from "../../entities/catalogues/mobile-purchase-variants.entity";

@injectable()
class MobileCataloguePurchaseVariantRepository
  implements IMobileCataloguePurchaseVariantRepository
{
  @inject(ContainerTypes.MobileCataloguePurchaseVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IMobileCataloguePurchaseVariantEntity>;

  async createMobileCataloguePurchaseVariant(
    cataloguePurchaseVariant: IMobileCataloguePurchaseVariantEntity
  ): Promise<IMobileCataloguePurchaseVariantEntity> {
    return this.repositoryBase.create(cataloguePurchaseVariant);
  }

  async getMobileCataloguePurchaseVariant(
    query: any
  ): Promise<IMobileCataloguePurchaseVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllMobileCataloguePurchaseVariants(
    query: any
  ): Promise<IMobileCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateMobileCataloguePurchaseVariants(
    id: string,
    cataloguePurchaseVariant: IMobileCataloguePurchaseVariantEntity
  ): Promise<IMobileCataloguePurchaseVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      cataloguePurchaseVariant
    )) as IMobileCataloguePurchaseVariantEntity;
  }
  async deleteMobileCataloguePurchaseVariants(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterMobileCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IMobileCataloguePurchaseVariantEntity[]> {
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
    variants: IMobileCataloguePurchaseVariantEntity[]
  ): Promise<IMobileCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default MobileCataloguePurchaseVariantRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IPosCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-pos-purchase-variant.repository";
import { IPosCataloguePurchaseVariantEntity } from "../../entities/catalogues/pos-purchase-variants.entity";
import { IIosCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-ios-purchase-variant.repository";
import { IIosCataloguePurchaseVariantEntity } from "../../entities/catalogues/ios-purchase-variants.entity";
import { IAndroidCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-android-purchase-variant.repository";
import { IAndroidCataloguePurchaseVariantEntity } from "../../entities/catalogues/android-catalogue-purchase-variant.entity";

@injectable()
class AndroidCataloguePurchaseVariantRepository
  implements IAndroidCataloguePurchaseVariantRepository
{
  @inject(ContainerTypes.AndroidCataloguePurchaseVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IAndroidCataloguePurchaseVariantEntity>;

  async createAndroidCataloguePurchaseVariant(
    cataloguePurchaseVariant: IAndroidCataloguePurchaseVariantEntity
  ): Promise<IAndroidCataloguePurchaseVariantEntity> {
    return this.repositoryBase.create(cataloguePurchaseVariant);
  }

  async getAndroidCataloguePurchaseVariant(
    query: any
  ): Promise<IAndroidCataloguePurchaseVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllAndroidCataloguePurchaseVariants(
    query: any
  ): Promise<IAndroidCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateAndroidCataloguePurchaseVariants(
    id: string,
    cataloguePurchaseVariant: IAndroidCataloguePurchaseVariantEntity
  ): Promise<IAndroidCataloguePurchaseVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      cataloguePurchaseVariant
    )) as IAndroidCataloguePurchaseVariantEntity;
  }
  async deleteAndroidCataloguePurchaseVariants(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterAndroidCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IAndroidCataloguePurchaseVariantEntity[]> {
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
    variants: IAndroidCataloguePurchaseVariantEntity[]
  ): Promise<IAndroidCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default AndroidCataloguePurchaseVariantRepository;

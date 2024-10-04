import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IPosCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-pos-purchase-variant.repository";
import { IPosCataloguePurchaseVariantEntity } from "../../entities/catalogues/pos-purchase-variants.entity";
import { IIosCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-ios-purchase-variant.repository";
import { IIosCataloguePurchaseVariantEntity } from "../../entities/catalogues/ios-purchase-variants.entity";

@injectable()
class IosCataloguePurchaseVariantRepository
  implements IIosCataloguePurchaseVariantRepository
{
  @inject(ContainerTypes.IosCataloguePurchaseVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IIosCataloguePurchaseVariantEntity>;

  async createIosCataloguePurchaseVariant(
    cataloguePurchaseVariant: IIosCataloguePurchaseVariantEntity
  ): Promise<IPosCataloguePurchaseVariantEntity> {
    return this.repositoryBase.create(cataloguePurchaseVariant);
  }

  async getIosCataloguePurchaseVariant(
    query: any
  ): Promise<IIosCataloguePurchaseVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllIosCataloguePurchaseVariants(
    query: any
  ): Promise<IIosCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateIosCataloguePurchaseVariants(
    id: string,
    cataloguePurchaseVariant: IIosCataloguePurchaseVariantEntity
  ): Promise<IIosCataloguePurchaseVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      cataloguePurchaseVariant
    )) as IIosCataloguePurchaseVariantEntity;
  }
  async deleteIosCataloguePurchaseVariants(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterIosCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IIosCataloguePurchaseVariantEntity[]> {
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
    variants: IIosCataloguePurchaseVariantEntity[]
  ): Promise<IIosCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default IosCataloguePurchaseVariantRepository;

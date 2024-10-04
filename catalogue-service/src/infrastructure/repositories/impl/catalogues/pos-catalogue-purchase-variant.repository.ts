import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IPosCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-pos-purchase-variant.repository";
import { IPosCataloguePurchaseVariantEntity } from "../../entities/catalogues/pos-purchase-variants.entity";

@injectable()
class PosCataloguePurchaseVariantRepository
  implements IPosCataloguePurchaseVariantRepository
{
  @inject(ContainerTypes.PosCataloguePurchaseVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IPosCataloguePurchaseVariantEntity>;

  async createPosCataloguePurchaseVariant(
    cataloguePurchaseVariant: IPosCataloguePurchaseVariantEntity
  ): Promise<IPosCataloguePurchaseVariantEntity> {
    return this.repositoryBase.create(cataloguePurchaseVariant);
  }

  async getPosCataloguePurchaseVariant(
    query: any
  ): Promise<IPosCataloguePurchaseVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllPosCataloguePurchaseVariants(
    query: any
  ): Promise<IPosCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updatePosCataloguePurchaseVariants(
    id: string,
    cataloguePurchaseVariant: IPosCataloguePurchaseVariantEntity
  ): Promise<IPosCataloguePurchaseVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      cataloguePurchaseVariant
    )) as IPosCataloguePurchaseVariantEntity;
  }
  async deletePosCataloguePurchaseVariants(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterPosCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IPosCataloguePurchaseVariantEntity[]> {
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
    variants: IPosCataloguePurchaseVariantEntity[]
  ): Promise<IPosCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default PosCataloguePurchaseVariantRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IGlobalCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-global-purchase-variant.repository";
import { IGlobalCataloguePurchaseVariantEntity } from "../../entities/catalogues/global-purchase-variants.entity";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";

@injectable()
class GlobalCataloguePurchaseVariantRepository
  implements IGlobalCataloguePurchaseVariantRepository
{
  @inject(ContainerTypes.GlobalCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IGlobalCataloguePurchaseVariantEntity>;

  async createGlobalCataloguePurchaseVariant(
    cataloguePurchaseVariant: IGlobalCataloguePurchaseVariantEntity
  ): Promise<IGlobalCataloguePurchaseVariantEntity> {
    return this.repositoryBase.create(cataloguePurchaseVariant);
  }

  async getGlobalCataloguePurchaseVariant(
    query: any
  ): Promise<IGlobalCataloguePurchaseVariantEntity> {
    return this.repositoryBase.findOne(query, "");
  }
  async getAllGlobalCataloguePurchaseVariants(
    query: any
  ): Promise<IGlobalCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateGlobalCataloguePurchaseVariants(
    id: string,
    cataloguePurchaseVariant: IGlobalCataloguePurchaseVariantEntity
  ): Promise<IGlobalCataloguePurchaseVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      cataloguePurchaseVariant
    )) as IGlobalCataloguePurchaseVariantEntity;
  }
  async deleteGlobalCataloguePurchaseVariants(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterGlobalCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IGlobalCataloguePurchaseVariantEntity[]> {
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
    variants: IGlobalCataloguePurchaseVariantEntity[]
  ): Promise<IGlobalCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default GlobalCataloguePurchaseVariantRepository;

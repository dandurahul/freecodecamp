import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IWebCataloguePurchaseVariantRepository } from "../../contracts/catalogues/i-web-purchase-variant.repository";
import { IWebCataloguePurchaseVariantEntity } from "../../entities/catalogues/web-purchase-variants.entity";

@injectable()
class WebCataloguePurchaseVariantRepository
  implements IWebCataloguePurchaseVariantRepository
{
  @inject(ContainerTypes.WebCataloguePurchaseVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IWebCataloguePurchaseVariantEntity>;

  async createWebCataloguePurchaseVariant(
    cataloguePurchaseVariant: IWebCataloguePurchaseVariantEntity
  ): Promise<IWebCataloguePurchaseVariantEntity> {
    return this.repositoryBase.create(cataloguePurchaseVariant);
  }

  async getWebCataloguePurchaseVariant(
    query: any
  ): Promise<IWebCataloguePurchaseVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllWebCataloguePurchaseVariants(
    query: any
  ): Promise<IWebCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateWebCataloguePurchaseVariants(
    id: string,
    cataloguePurchaseVariant: IWebCataloguePurchaseVariantEntity
  ): Promise<IWebCataloguePurchaseVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      cataloguePurchaseVariant
    )) as IWebCataloguePurchaseVariantEntity;
  }
  async deleteWebCataloguePurchaseVariants(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterWebCataloguePurchaseVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IWebCataloguePurchaseVariantEntity[]> {
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
    variants: IWebCataloguePurchaseVariantEntity[]
  ): Promise<IWebCataloguePurchaseVariantEntity[]> {
    return this.repositoryBase.bulkInsert(variants);
  }

  bulkWrite(variants: any[]): Promise<any> {
    const bulkEntities = buildQueryForBulkWrite(variants);
    return this.repositoryBase.bulkWrite(bulkEntities);
  }
}
export default WebCataloguePurchaseVariantRepository;

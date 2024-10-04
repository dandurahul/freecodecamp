import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IMobileCatalogueVariantRepository } from "../../contracts/catalogues/i-mobile-variant.repository";
import { IMobileCatalogueVariantEntity } from "../../entities/catalogues/mobile.catalogue-variants.entity";

@injectable()
class MobileCatalogueVariantRepository
  implements IMobileCatalogueVariantRepository
{
  @inject(ContainerTypes.MobileCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IMobileCatalogueVariantEntity>;

  async createMobileCatalogueVariant(
    catalogueVariant: IMobileCatalogueVariantEntity
  ): Promise<IMobileCatalogueVariantEntity> {
    return this.repositoryBase.create(catalogueVariant);
  }

  async getMobileCatalogueVariant(
    query: any
  ): Promise<IMobileCatalogueVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllMobileCatalogueVariants(
    query: any
  ): Promise<IMobileCatalogueVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateMobileCatalogueVariant(
    id: string,
    catalogueVariant: IMobileCatalogueVariantEntity
  ): Promise<IMobileCatalogueVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogueVariant
    )) as IMobileCatalogueVariantEntity;
  }
  async deleteMobileCatalogueVariant(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterMobileCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IMobileCatalogueVariantEntity[]> {
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
    variants: IMobileCatalogueVariantEntity[]
  ): Promise<IMobileCatalogueVariantEntity[]> {
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
export default MobileCatalogueVariantRepository;

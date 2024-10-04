import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildQueryForBulkWrite } from "../../builders/query.builder";
import { IPosCatalogueVariantEntity } from "../../entities/catalogues/pos-catalogue-varint.entity";
import { IIosCatalogueVariantRepository } from "../../contracts/catalogues/i-ios-variant.repository";
import { IIosCatalogueVariantEntity } from "../../entities/catalogues/ios-catalogue-variants.entity";

@injectable()
class IosCatalogueVariantRepository implements IIosCatalogueVariantRepository {
  @inject(ContainerTypes.IosCatalogueVariantRepositoryBase)
  private repositoryBase!: IRepositoryBase<IIosCatalogueVariantEntity>;

  async createIosCatalogueVariant(
    catalogueVariant: IIosCatalogueVariantEntity
  ): Promise<IIosCatalogueVariantEntity> {
    return this.repositoryBase.create(catalogueVariant);
  }

  async getIosCatalogueVariant(
    query: any
  ): Promise<IIosCatalogueVariantEntity> {
    return this.repositoryBase.findOne(query);
  }
  async getAllIosCatalogueVariants(
    query: any
  ): Promise<IIosCatalogueVariantEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateIosCatalogueVariant(
    id: string,
    catalogueVariant: IIosCatalogueVariantEntity
  ): Promise<IIosCatalogueVariantEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogueVariant
    )) as IIosCatalogueVariantEntity;
  }
  async deleteIosCatalogueVariant(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterIosCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IIosCatalogueVariantEntity[]> {
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
    variants: IIosCatalogueVariantEntity[]
  ): Promise<IIosCatalogueVariantEntity[]> {
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
export default IosCatalogueVariantRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildFilterObjectForStoreCatalogues } from "../../helpers/store-catalogues-filter.helper";
import { IIosCatalogueRepository } from "../../contracts/catalogues/i-ios-catalogue.repository";
import { IIosCatalogueEntity } from "../../entities/catalogues/ios-catalogue.entity";
import {
  buildFilterObjectForIosCatalogues,
  buildPopulateWithVariants,
} from "../../helpers/ios-catalogue-filter.helper";

@injectable()
class IosCatalogueRepository implements IIosCatalogueRepository {
  @inject(ContainerTypes.IosCatalogueRepositoryBase)
  private repositoryBase!: IRepositoryBase<IIosCatalogueEntity>;

  async createIosCatalogue(
    catalogue: IIosCatalogueEntity
  ): Promise<IIosCatalogueEntity> {
    return this.repositoryBase.create(catalogue);
  }
  async getIosCatalogue(query: any): Promise<IIosCatalogueEntity> {
    let populate: string = buildPopulateWithVariants() as any;
    return await this.repositoryBase.findOne(query, populate);
  }
  async getAllIosCatalogues(query: any): Promise<IIosCatalogueEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateIosCatalogue(
    id: string,
    catalogue: IIosCatalogueEntity
  ): Promise<IIosCatalogueEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogue
    )) as IIosCatalogueEntity;
  }
  async deleteIosCatalogue(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterIosCatalogues(
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number,
    fetchType?: string | undefined
  ): Promise<IIosCatalogueEntity[]> {
    let filter = buildFilterObjectForIosCatalogues(
      filterCriteria,
      filterType,
      fetchType
    );
    return await this.repositoryBase.filter(
      filter?.filter ? filter.filter : {},
      filter?.fields,
      filter?.populate,
      filter?.aggregate,
      pageSize,
      page,
      filter?.sort
    );
  }
  createIosCatalogues(
    storeCatalogues: IIosCatalogueEntity[]
  ): Promise<IIosCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogues);
  }
  updateIosCatalogues(storeCatalogues: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(storeCatalogues);
  }
  filterByPagination(filterCriteria: any): Promise<any> {
    let filter = buildFilterObjectForStoreCatalogues(filterCriteria);
    return this.repositoryBase.count(filter?.filter);
  }
  getProductCountBasedOnStores(filterCriteria: any): Promise<any> {
    let aggregate = [
      { $match: { deleteFlag: false } },
      {
        $addFields: {
          entityInternalId: { $toString: "$entityInternalId" },
        },
      },
      {
        $group: {
          _id: "$entityInternalId",
          objectIds: { $addToSet: "$_id" },
          productsCount: { $sum: 1 },
        },
      },
      {
        $project: {
          entityInternalId: { $toString: "$_id" },
          productsCount: 1,
          _id: 1,
        },
      },
    ];
    //  here aggregate we have to put
    return this.repositoryBase.filter(
      filterCriteria,
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }
  async updateBulkIosCatalogue(
    query: object,
    androidCatalogue: IIosCatalogueEntity
  ): Promise<IIosCatalogueEntity> {
    let filter = buildFilterObjectForStoreCatalogues(query);
    return (await this.repositoryBase.updateMany(
      filter?.filter || {},
      androidCatalogue
    )) as IIosCatalogueEntity;
  }
  bulkInsert(
    storeCatalogue: IIosCatalogueEntity[]
  ): Promise<IIosCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogue);
  }
}
export default IosCatalogueRepository;

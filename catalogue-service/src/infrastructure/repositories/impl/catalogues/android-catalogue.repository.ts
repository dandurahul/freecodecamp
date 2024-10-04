import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IAndroidCatalogueRepository } from "../../contracts/catalogues/i-android-catalogue.repository";
import { IAndroidCatalogueEntity } from "../../entities/catalogues/android-catalogue.entity";
import { buildFilterObjectForStoreCatalogues } from "../../helpers/store-catalogues-filter.helper";
import {
  buildFilterObjectForAndroidCatalogues,
  buildPopulateWithVariants,
} from "../../helpers/android-catalogue-filter.helper";

@injectable()
class AndroidCatalogueRepository implements IAndroidCatalogueRepository {
  @inject(ContainerTypes.AndroidCatalogueRepositoryBase)
  private repositoryBase!: IRepositoryBase<IAndroidCatalogueEntity>;

  async createAndroidCatalogue(
    catalogue: IAndroidCatalogueEntity
  ): Promise<IAndroidCatalogueEntity> {
    return this.repositoryBase.create(catalogue);
  }

  async getAndroidCatalogue(query: any): Promise<IAndroidCatalogueEntity> {
    let populate: string = buildPopulateWithVariants() as any;
    return await this.repositoryBase.findOne(query, populate);
  }

  async getAllAndroidCatalogues(
    query: any
  ): Promise<IAndroidCatalogueEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateAndroidCatalogue(
    id: string,
    catalogue: IAndroidCatalogueEntity
  ): Promise<IAndroidCatalogueEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogue
    )) as IAndroidCatalogueEntity;
  }
  async deleteAndroidCatalogue(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterAndroidCatalogues(
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number,
    fetchType?: string | undefined
  ): Promise<IAndroidCatalogueEntity[]> {
    let filter = buildFilterObjectForAndroidCatalogues(
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

  createAndroidCatalogues(
    storeCatalogues: IAndroidCatalogueEntity[]
  ): Promise<IAndroidCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogues);
  }

  updateAndroidCatalogues(storeCatalogues: any[]): Promise<any> {
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

  async updateBulkAndroidCatalogue(
    query: object,
    androidCatalogue: IAndroidCatalogueEntity
  ): Promise<IAndroidCatalogueEntity> {
    let filter = buildFilterObjectForStoreCatalogues(query);
    return (await this.repositoryBase.updateMany(
      filter?.filter || {},
      androidCatalogue
    )) as IAndroidCatalogueEntity;
  }

  bulkInsert(
    storeCatalogue: IAndroidCatalogueEntity[]
  ): Promise<IAndroidCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogue);
  }
}
export default AndroidCatalogueRepository;

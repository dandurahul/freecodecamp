import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildFilterObjectForStoreCatalogues } from "../../helpers/store-catalogues-filter.helper";
import { IMobileCatalogueEntity } from "../../entities/catalogues/mobile-catalogues.entity";
import { IMobileCatalogueRepository } from "../../contracts/catalogues/i-mobile-catalogue.repository";
import {
  buildFilterObjectForMobileCatalogues,
  buildPopulateWithVariants,
} from "../../helpers/mobile-catalogue-filter.helper";
@injectable()
class MobileCatalogueRepository implements IMobileCatalogueRepository {
  @inject(ContainerTypes.MobileCatalogueRepositoryBase)
  private repositoryBase!: IRepositoryBase<IMobileCatalogueEntity>;

  async createMobileCatalogue(
    catalogue: IMobileCatalogueEntity
  ): Promise<IMobileCatalogueEntity> {
    return this.repositoryBase.create(catalogue);
  }

  async getMobileCatalogue(query: any): Promise<IMobileCatalogueEntity> {
    let populate: string = buildPopulateWithVariants() as any;
    return await this.repositoryBase.findOne(query, populate);
  }
  async getAllMobileCatalogues(query: any): Promise<IMobileCatalogueEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateMobileCatalogue(
    id: string,
    catalogue: IMobileCatalogueEntity
  ): Promise<IMobileCatalogueEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogue
    )) as IMobileCatalogueEntity;
  }
  async deleteMobileCatalogue(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterMobileCatalogues(
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number,
    fetchType?: string | undefined
  ): Promise<IMobileCatalogueEntity[]> {
    let filter = buildFilterObjectForMobileCatalogues(
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

  createMobileCatalogues(
    storeCatalogues: IMobileCatalogueEntity[]
  ): Promise<IMobileCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogues);
  }

  updateMobileCatalogues(storeCatalogues: any[]): Promise<any> {
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
    return this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }

  async updateBulkMobileCatalogue(
    query: object,
    storeCatalogue: IMobileCatalogueEntity
  ): Promise<IMobileCatalogueEntity> {
    let filter = buildFilterObjectForStoreCatalogues(query);
    return (await this.repositoryBase.updateMany(
      filter?.filter || {},
      storeCatalogue
    )) as IMobileCatalogueEntity;
  }

  bulkInsert(
    storeCatalogue: IMobileCatalogueEntity[]
  ): Promise<IMobileCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogue);
  }
}
export default MobileCatalogueRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IStoreCatalogueRepository } from "../../contracts/catalogues/i-store-catalogue.repository";
import { IStoreCatalogueEntity } from "../../entities/catalogues/store-catalogues.entity";
import { buildFilterObjectForStoreCatalogues } from "../../helpers/store-catalogues-filter.helper";
import { IWebCatalogueRepository } from "../../contracts/catalogues/i-web-catalogue.repository";
import { IWebCatalogueEntity } from "../../entities/catalogues/web-catalogues.entity";
import {
  buildFilterObjectForWebCatalogues,
  buildPopulateWithVariants,
} from "../../helpers/web-catalogue-filter.helper";

@injectable()
class WebCatalogueRepository implements IWebCatalogueRepository {
  @inject(ContainerTypes.WebCatalogueRepositoryBase)
  private repositoryBase!: IRepositoryBase<IWebCatalogueEntity>;

  async createWebCatalogue(
    catalogue: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity> {
    return this.repositoryBase.create(catalogue);
  }

  async getWebCatalogue(query: any): Promise<IWebCatalogueEntity> {
    let populate: string = buildPopulateWithVariants() as any;
    return await this.repositoryBase.findOne(query, populate);
  }
  async getAllWebCatalogues(query: any): Promise<IWebCatalogueEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateWebCatalogue(
    id: string,
    catalogue: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogue
    )) as IWebCatalogueEntity;
  }
  async deleteWebCatalogue(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterWebCatalogues(
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number,
    fetchType?: string | undefined
  ): Promise<IWebCatalogueEntity[]> {
    let filter = buildFilterObjectForWebCatalogues(
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

  createWebCatalogues(
    storeCatalogues: IWebCatalogueEntity[]
  ): Promise<IWebCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogues);
  }

  updateWebCatalogues(storeCatalogues: any[]): Promise<any> {
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

  async updateBulkWebCatalogue(
    query: object,
    storeCatalogue: IWebCatalogueEntity
  ): Promise<IWebCatalogueEntity> {
    let filter = buildFilterObjectForStoreCatalogues(query);
    return (await this.repositoryBase.updateMany(
      filter?.filter || {},
      storeCatalogue
    )) as IWebCatalogueEntity;
  }

  bulkInsert(
    storeCatalogue: IWebCatalogueEntity[]
  ): Promise<IWebCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogue);
  }
}
export default WebCatalogueRepository;

import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildFilterObjectForStoreCatalogues } from "../../helpers/store-catalogues-filter.helper";
import { IPosCatalogueRepository } from "../../contracts/catalogues/i-pos-catalogue.reository";
import { IPosCatalogueEntity } from "../../entities/catalogues/pos-catalogue.entity";
import {
  buildFilterObjectForPosCatalogues,
  buildPopulateWithVariants,
} from "../../helpers/pos-catalogue-filter.helper";

@injectable()
class PosCatalogueRepository implements IPosCatalogueRepository {
  @inject(ContainerTypes.PosCatalogueRepositoryBase)
  private repositoryBase!: IRepositoryBase<IPosCatalogueEntity>;

  async createPosCatalogue(
    catalogue: IPosCatalogueEntity
  ): Promise<IPosCatalogueEntity> {
    return this.repositoryBase.create(catalogue);
  }
  async getPosCatalogue(query: any): Promise<IPosCatalogueEntity> {
    let populate: string = buildPopulateWithVariants() as any;
    return await this.repositoryBase.findOne(query, populate);
  }
  async getAllPosCatalogues(query: any): Promise<IPosCatalogueEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updatePosCatalogue(
    id: string,
    catalogue: IPosCatalogueEntity
  ): Promise<IPosCatalogueEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogue
    )) as IPosCatalogueEntity;
  }
  async deletePosCatalogue(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterPosCatalogues(
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number,
    fetchType?: string | undefined
  ): Promise<IPosCatalogueEntity[]> {
    let filter = buildFilterObjectForPosCatalogues(
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
  createPosCatalogues(
    storeCatalogues: IPosCatalogueEntity[]
  ): Promise<IPosCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogues);
  }
  updatePosCatalogues(storeCatalogues: any[]): Promise<any> {
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
  async updateBulkPosCatalogue(
    query: object,
    androidCatalogue: IPosCatalogueEntity
  ): Promise<IPosCatalogueEntity> {
    let filter = buildFilterObjectForStoreCatalogues(query);
    return (await this.repositoryBase.updateMany(
      filter?.filter || {},
      androidCatalogue
    )) as IPosCatalogueEntity;
  }
  bulkInsert(
    storeCatalogue: IPosCatalogueEntity[]
  ): Promise<IPosCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogue);
  }
}
export default PosCatalogueRepository;

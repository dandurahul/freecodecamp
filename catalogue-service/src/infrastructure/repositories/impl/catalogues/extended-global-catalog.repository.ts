import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IExtendedGlobalCatalogRepository } from "../../contracts/catalogues/i-extended-global-catalog.repository";
import { IExtendedGlobalCatalogEntity } from "../../entities/catalogues/extended-global-catalog.entity";
import { ExtendedGlobalCatalogFilterModel } from "../../../../domain/models/catalogues/extended-global-catalog-filter.model";
import { buildFilterObjectForExtendedGlobalCatalogues } from "../../helpers/extended-global-catalog-filter.helper";

@injectable()
class ExtendedGlobalCatalogRepository
  implements IExtendedGlobalCatalogRepository
{
  @inject(ContainerTypes.ExtendedGlobalCatalogRepositoryBase)
  private repositoryBase!: IRepositoryBase<IExtendedGlobalCatalogEntity>;

  async createExtendedGlobalCatalog(
    ExtendedGlobalCatalog: IExtendedGlobalCatalogEntity
  ): Promise<IExtendedGlobalCatalogEntity> {
    return this.repositoryBase.create(ExtendedGlobalCatalog);
  }

  async getExtendedGlobalCatalog(
    query: any
  ): Promise<IExtendedGlobalCatalogEntity> {
    return this.repositoryBase.findOne(
      query,
      "categoryId subCategoryId classificationId globalCatalogue secondaryCategory secondarySubCategory"
    );
  }
  async getAllExtendedGlobalCatalogDetails(
    query: any
  ): Promise<IExtendedGlobalCatalogEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateExtendedGlobalCatalog(
    id: string,
    ExtendedGlobalCatalog: IExtendedGlobalCatalogEntity
  ): Promise<IExtendedGlobalCatalogEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      ExtendedGlobalCatalog
    )) as IExtendedGlobalCatalogEntity;
  }
  async deleteExtendedGlobalCatalog(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }

  async getExtendedGlobalCatalogCount(
    query: IExtendedGlobalCatalogEntity
  ): Promise<number> {
    let filter = buildFilterObjectForExtendedGlobalCatalogues(query);
    return this.repositoryBase.count(
      filter?.filter ? filter.filter : {}
    ) as any;
  }
  async filterExtendedGlobalCatalog(
    filterCriteria: ExtendedGlobalCatalogFilterModel,
    filterType?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IExtendedGlobalCatalogEntity[]> {
    let filter = buildFilterObjectForExtendedGlobalCatalogues(
      filterCriteria,
      filterType,
      page,
      pageSize
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

  bulkInsert(
    ExtendedGlobalCatalog: IExtendedGlobalCatalogEntity[]
  ): Promise<IExtendedGlobalCatalogEntity[]> {
    return this.repositoryBase.bulkInsert(ExtendedGlobalCatalog);
  }

  bulkWrite(data: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(data);
  }

  bulkDelete(data: any[]): Promise<any> {
    return this.repositoryBase.bulkDelete(data);
  }

  async updateMany(
    query: any,
    extendedCatalogue: IExtendedGlobalCatalogEntity
  ): Promise<IExtendedGlobalCatalogEntity> {
    let filter = { _id: { $in: query?.productIds || [] } };
    return (await this.repositoryBase.updateMany(
      filter,
      extendedCatalogue
    )) as IExtendedGlobalCatalogEntity;
  }
}
export default ExtendedGlobalCatalogRepository;

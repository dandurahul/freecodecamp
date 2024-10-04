import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { ICatalogueStockEntity } from "../../entities/catalogues/catalogue-stocks.entity";
import { ICatalogueStockRepository } from "../../contracts/catalogues/i-catalogue-stock.repository";
import { buildRequestForForCatalogueStock } from "../../helpers/catalogue-stock-filter.helper";

@injectable()
class CatalogueStockRepository implements ICatalogueStockRepository {
  @inject(ContainerTypes.CatalogueStockRepositoryBase)
  private repositoryBase!: IRepositoryBase<ICatalogueStockEntity>;

  async updateCatalogueStock(
    filter: any,
    stocks: any
  ): Promise<ICatalogueStockEntity> {
    // const filter = {
    //   "businessUnitId": businessUnitId,
    //   "itemCode": itemCode,
    //   "stores.entityInternalId": entityInternalId
    // };
    if (stocks < 0) {
      stocks = {
        $inc: { "stores.$.stockBalance": stocks },
      };
    } else {
      stocks = {
        $set: { "stores.$.stockBalance": stocks },
      };
    }
    let result = await this.repositoryBase.findOneAndUpdate(
      filter,
      stocks as unknown as ICatalogueStockEntity
    );

    // the document exists but the store array does not contain the entityInternalId
    if (!result) {
      result = await this.repositoryBase.findOneAndUpdate(
        { businessUnitId: filter.businessUnitId, itemCode: filter.itemCode },
        {
          $addToSet: {
            stores: {
              entityInternalId: filter.entityInternalId,
              stockBalance: filter.stocks,
              StockType: true,
            },
          },
        } as unknown as ICatalogueStockEntity
      );
    }
    return result;
  }

  async getCatalogueStock(
    query: any,
    filterType: string | undefined
  ): Promise<ICatalogueStockEntity> {
    return this.repositoryBase.findOne(query);
  }

  async filterCatalogueStock(
    filterCriteria: any,
    filterType: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<ICatalogueStockEntity[]> {
    let filter = buildRequestForForCatalogueStock(filterCriteria, filterType);

    if (filter.aggregate) {
      filter.aggregate.push({ $skip: ((page || 1) - 1) * (pageSize || 0) });
      filter.aggregate.push({ $limit: pageSize || 25 });
    }
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

  createCatalogueStocks(
    categoryEntity: ICatalogueStockEntity[]
  ): Promise<ICatalogueStockEntity[]> {
    return this.repositoryBase.bulkInsert(categoryEntity);
  }
  deleteCatalogueStocks(
    query: ICatalogueStockEntity
  ): Promise<ICatalogueStockEntity> {
    return this.repositoryBase.bulkDelete(query);
  }
}
export default CatalogueStockRepository;

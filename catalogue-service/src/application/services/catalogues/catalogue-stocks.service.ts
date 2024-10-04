import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { CatalogueStockModel } from "../../../domain/models/catalogues/catalogue-stocks.model";
import { ICatalogueStockService } from "../../contracts/catalogues/i-catalogue-stock.service";
import { ICatalogueStockRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-catalogue-stock.repository";
import { TransformOptions } from "../../constants/transform-options";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { ICatalogueStockEntity } from "../../../infrastructure/repositories/entities/catalogues/catalogue-stocks.entity";
import { IGlobalCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue-variant.repository";
import { executeInBatches } from "../../utils/common.util";
import { FilterConstants } from "../../constants/filter.constants";

@injectable()
class CatalogueStockService implements ICatalogueStockService {
  @inject(ContainerTypes.CatalogueStockRepository)
  private catalogueStockRepository!: ICatalogueStockRepository;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;
  @inject(ContainerTypes.GlobalCatalogueVariantRepository)
  private globalCatalogueVariantRepository!: IGlobalCatalogueVariantRepository;

  async createOrUpdateCatalogueStock(
    filter: any,
    stock: number,
    filterType?: string
  ): Promise<CatalogueStockModel> {
    let catalogueStockResponse =
      await this.catalogueStockRepository.updateCatalogueStock(
        filter,
        stock,
        filterType
      );
    return plainToInstance(
      CatalogueStockModel,
      catalogueStockResponse,
      TransformOptions.tranformOptions
    );
  }

  async getCatalogueStock(query: any, filterType: string): Promise<any> {
    try {
      return await this.catalogueStockRepository.getCatalogueStock(
        query,
        filterType
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //find by id
  async createCatalogueStocks(
    catalgueStocks: any,
    filterType: string | undefined
  ): Promise<CatalogueStockModel[]> {
    try {
      if (filterType == "Sync") {
        await this.catalogueStockRepository.deleteCatalogueStocks(
          {} as ICatalogueStockEntity
        );
        catalgueStocks =
          await this.storeCatalogueRepository.getAccumulatedStoreStocks();
        await this.updateGlobalCatalogueStocks(catalgueStocks);
      }
      let catalogueStock =
        await this.catalogueStockRepository.createCatalogueStocks(
          catalgueStocks
        );
      return plainToInstance(
        CatalogueStockModel,
        catalogueStock,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private async updateGlobalCatalogueStocks(catalogueStocks: any) {
    let updateArray: any = [];
    catalogueStocks?.forEach((c: any) => {
      updateArray.push({
        itemCode: c.itemCode,
        stockBalance: c.totalStock,
      });
    });
    return await executeInBatches(
      updateArray,
      this.globalCatalogueVariantRepository.bulkWrite,
      FilterConstants.DEFAULT_BATCH_SIZE
    );
  }

  async filterCatalogueStocks(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<any> {
    try {
      let catalogueStockResponse =
        this.catalogueStockRepository.filterCatalogueStock(
          filterCriteria,
          filterType,
          pageSize,
          page,
          fetchType
        );
      return catalogueStockResponse; //plainToInstance(CatalogueStockModel, catalogueStockResponse);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
export default CatalogueStockService;

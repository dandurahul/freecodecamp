import { injectable, inject } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { TransformOptions } from "../../constants/transform-options";
import { StoreProductCountModel } from "../../../domain/models/catalogues/store-product-count.model";
import { plainToInstance } from "class-transformer";
import { IPosCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-pos-catalogue.reository";
import { IStoreCatalogueFilterService } from "../../contracts/catalogues/i-store-catalogue-filter.service";

@injectable()
class IosCatalogueFilterService implements IStoreCatalogueFilterService {
  @inject(ContainerTypes.IosCatalogueRepository)
  private iosCatelogueRepository!: IPosCatalogueRepository;

  async getProductCountBasedOnStores(
    filterCriteria: any
  ): Promise<StoreProductCountModel[]> {
    return plainToInstance(
      StoreProductCountModel,
      await this.iosCatelogueRepository.getProductCountBasedOnStores(
        filterCriteria
      ),
      TransformOptions.tranformOptions
    ) as any;
  }

  async getUnSyncedProductBasedOnStores(): Promise<any> {}
}

export default IosCatalogueFilterService;

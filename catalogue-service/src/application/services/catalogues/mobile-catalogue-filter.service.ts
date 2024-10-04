import { injectable, inject } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { TransformOptions } from "../../constants/transform-options";
import { StoreProductCountModel } from "../../../domain/models/catalogues/store-product-count.model";
import { plainToInstance } from "class-transformer";
import { IMobileCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-mobile-catalogue.repository";
import { IStoreCatalogueFilterService } from "../../contracts/catalogues/i-store-catalogue-filter.service";

@injectable()
class MobileCatalogueFilterService implements IStoreCatalogueFilterService {
  @inject(ContainerTypes.MobileCatalogueRepository)
  private mobileCatelogueRepository!: IMobileCatalogueRepository;

  async getProductCountBasedOnStores(
    filterCriteria: any
  ): Promise<StoreProductCountModel[]> {
    return plainToInstance(
      StoreProductCountModel,
      await this.mobileCatelogueRepository.getProductCountBasedOnStores(
        filterCriteria
      ),
      TransformOptions.tranformOptions
    ) as any;
  }

  async getUnSyncedProductBasedOnStores(): Promise<any> {}
}

export default MobileCatalogueFilterService;

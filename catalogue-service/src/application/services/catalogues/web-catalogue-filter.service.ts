import { injectable, inject } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { TransformOptions } from "../../constants/transform-options";
import { StoreProductCountModel } from "../../../domain/models/catalogues/store-product-count.model";
import { plainToInstance } from "class-transformer";
import { IWebCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-web-catalogue.repository";
import { IStoreCatalogueFilterService } from "../../contracts/catalogues/i-store-catalogue-filter.service";

@injectable()
class WebCalalogueFilterService implements IStoreCatalogueFilterService {
  @inject(ContainerTypes.WebCatalogueRepository)
  private webCatelogueRepository!: IWebCatalogueRepository;

  async getProductCountBasedOnStores(
    filterCriteria: any
  ): Promise<StoreProductCountModel[]> {
    return plainToInstance(
      StoreProductCountModel,
      await this.webCatelogueRepository.getProductCountBasedOnStores(
        filterCriteria
      ),
      TransformOptions.tranformOptions
    ) as any;
  }

  async getUnSyncedProductBasedOnStores(): Promise<any> {}
}

export default WebCalalogueFilterService;

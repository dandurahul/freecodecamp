import { injectable, inject } from "inversify";
import { IStoreCatalogueFilterService } from "../../contracts/catalogues/i-store-catalogue-filter.service";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { TransformOptions } from "../../constants/transform-options";
import { StoreProductCountModel } from "../../../domain/models/catalogues/store-product-count.model";
import { plainToInstance } from "class-transformer";
import { StoreCatalogueDetailsModel } from "../../../domain/models/catalogues/store-catalogue-details.model";
import { IGlobalCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { StoreCatalogueGroupModel } from "../../../domain/models/catalogues/store-catalog-group.model";

@injectable()
class StoreCalalogueFilterService implements IStoreCatalogueFilterService {
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatelogueRepository!: IStoreCatalogueRepository;
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;

  async getProductCountBasedOnStores(
    filterCriteria: any
  ): Promise<StoreProductCountModel[]> {
    return plainToInstance(
      StoreProductCountModel,
      await this.storeCatelogueRepository.getProductCountBasedOnStores(
        filterCriteria
      ),
      TransformOptions.tranformOptions
    ) as any;
  }

  async getUnSyncedProductBasedOnStores(
    highlightId: any
  ): Promise<StoreCatalogueDetailsModel[]> {
    let globalCatalogue =
      await this.globalCatalogueRepository.filterGlobalCatalogues({
        highlights: [highlightId],
      });

    return plainToInstance(
      StoreCatalogueGroupModel,
      await this.storeCatelogueRepository.getUnsyncedProductBasedOnStores(
        highlightId,
        globalCatalogue.map((e) => e.productId)
      ),
      TransformOptions.tranformOptions
    ) as any;
  }
}

export default StoreCalalogueFilterService;

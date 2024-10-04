import { injectable, inject } from "inversify";
import { IStoreCatalogueFilterService } from "../../contracts/catalogues/i-store-catalogue-filter.service";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { TransformOptions } from "../../constants/transform-options";
import { StoreProductCountModel } from "../../../domain/models/catalogues/store-product-count.model";
import { plainToInstance } from "class-transformer";
import { IPosCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-pos-catalogue.reository";

@injectable()
class PosCatalogueFilterService implements IStoreCatalogueFilterService {
  @inject(ContainerTypes.PosCatalogueRepository)
  private posCatelogueRepository!: IPosCatalogueRepository;

  async getProductCountBasedOnStores(
    filterCriteria: any
  ): Promise<StoreProductCountModel[]> {
    return plainToInstance(
      StoreProductCountModel,
      await this.posCatelogueRepository.getProductCountBasedOnStores(
        filterCriteria
      ),
      TransformOptions.tranformOptions
    ) as any;
  }

  async getUnSyncedProductBasedOnStores(): Promise<any> {}
}

export default PosCatalogueFilterService;

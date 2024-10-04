import { ContainerTypes } from "../../api/bindings/container-types";
import { inject, injectable } from "inversify";
import { StoreCatalogueFilterModel } from "../../api/models/store-catalogue-product-filter.model";
import { FilterConstants } from "../constants/filter.constants";
import { GlobalCatalogueModel } from "../../domain/models/catalogues/global-catalogue.model";
import { IAndroidCatalogueHelperService } from "../contracts/helper/i-android-catalogue.helper.service";
import { IAndroidCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-android-catalogue.repository";
import { calculateCategorizationCount } from "../builders/store-catalogue.builder";

@injectable()
class AndroidCatalogueHelperService implements IAndroidCatalogueHelperService {
  @inject(ContainerTypes.AndroidCatalogueRepository)
  private androidCatalogueRepository!: IAndroidCatalogueRepository;

  async getAndroidCatalogueDetails(
    storeCatalogue: StoreCatalogueFilterModel,
    globalCatalogueProducts: GlobalCatalogueModel[],
    pageSize: number,
    page: number,
    extendedCatalogFlag: boolean
  ): Promise<any> {
    let storeProducts: any = [];

    try {
      storeCatalogue.productIds = globalCatalogueProducts?.map(
        (item: any) => item.productId
      );
      storeCatalogue.productIds = await this.filterHighlightsByIds(
        storeCatalogue
      );
      let productIdsData: any =
        await this.androidCatalogueRepository.filterAndroidCatalogues(
          storeCatalogue,
          FilterConstants.CHECK_VARIANTS
        );
      let productIds = productIdsData?.map((item: any) => item.productId);
      let categorizationCountDetails: any = calculateCategorizationCount(
        globalCatalogueProducts,
        productIds
      );
      storeCatalogue.productIds = productIds;
      storeProducts =
        await this.androidCatalogueRepository.filterAndroidCatalogues(
          storeCatalogue,
          FilterConstants.WITH_VARIANTS,
          pageSize,
          page
        );
      return [
        storeProducts,
        categorizationCountDetails?.categories,
        categorizationCountDetails?.subCategories,
        categorizationCountDetails?.classifications,
      ];
    } catch (e) {
      console.log(e);
    }
  }

  async filterHighlightsByIds(storeCatalogue: any) {
    let productIds = storeCatalogue?.productIds
      ? storeCatalogue.productIds
      : [];
    let entityInternalId = storeCatalogue?.entityInternalId
      ? storeCatalogue.entityInternalId
      : "";
    if (storeCatalogue?.highlightIds?.length > 0) {
      let highlightsIds = storeCatalogue.highlightIds
        ? storeCatalogue.highlightIds
        : [];

      let productList =
        await this.androidCatalogueRepository.filterAndroidCatalogues({
          entityInternalId,
          productIds,
          highlightIds: highlightsIds,
          deleteFlag: false,
          activeFlag: true,
        });
      productIds = productList && productList.map((item) => item.productId);
    }
    return productIds ? productIds : [];
  }
}

export default AndroidCatalogueHelperService;

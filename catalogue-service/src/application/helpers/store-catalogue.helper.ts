import { ContainerTypes } from "../../api/bindings/container-types";
import { inject, injectable } from "inversify";
import { IStoreCatalogueHelperService } from "../contracts/helper/i-store-catalogue.helper.service";
import { StoreCatalogueFilterModel } from "../../api/models/store-catalogue-product-filter.model";
import { IStoreCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { FilterConstants } from "../constants/filter.constants";
import { GlobalCatalogueModel } from "../../domain/models/catalogues/global-catalogue.model";
import { calculateCategorizationCount } from "../builders/store-catalogue.builder";
import FilterTypeEnum from "../../infrastructure/enums/filter.enum";
import { IReservedQuantityRepository } from "../../infrastructure/repositories/contracts/reserved/i-reserved-quantity.repository";

@injectable()
class StoreCatalogueHelperService implements IStoreCatalogueHelperService {
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;
  @inject(ContainerTypes.ReservedQuantityRepository)
  private reservedQuantityRepository!: IReservedQuantityRepository;

  async getStoreCatalogueDetails(
    storeCatalogue: StoreCatalogueFilterModel,
    globalCatalogueProducts: GlobalCatalogueModel[],
    pageSize: number,
    page: number
  ): Promise<any> {
    let globalProductIds = globalCatalogueProducts?.map((item: any) =>
      String(item.productId)
    );

    storeCatalogue.productIds = globalProductIds;
    storeCatalogue.highlightIds = storeCatalogue?.highlightIds?.length
      ? storeCatalogue?.highlightIds
      : undefined;

    if (
      !storeCatalogue.outOfStockProductsAllowed &&
      storeCatalogue?.productIds
    ) {
      storeCatalogue.reservedQuantities =
        await this.reservedQuantityRepository.getReservedQuantityGroupByProduct(
          storeCatalogue
        );
    }

    let storeProducts =
      await this.storeCatalogueRepository.filterStoreCatalogues(
        storeCatalogue,
        FilterConstants.CHECK_WITH_VARIANT,
        pageSize,
        page
      );
    let categorizationCountDetails: any = this.calculateCategorizationCount(
      globalCatalogueProducts,
      globalProductIds
    );
    return [
      storeProducts,
      categorizationCountDetails?.categories,
      categorizationCountDetails?.subCategories,
      categorizationCountDetails?.classifications,
    ];
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
        await this.storeCatalogueRepository.filterStoreCatalogues({
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

  calculateCategorizationCount(globalCatalogueProducts: any, productIds: any) {
    const globalCatalogue = globalCatalogueProducts?.filter((item: any) =>
      productIds?.includes(item?.productId?.toString())
    );

    const filterAndCompute = (categorizationType: any) =>
      this.computeCategorizationCount(globalCatalogue, categorizationType);

    const categories = filterAndCompute(FilterConstants.CATEGORY_POPULATE);
    const subCategories = filterAndCompute(
      FilterConstants.SUB_CATEGORY_POPULATE
    );
    const classifications = filterAndCompute(
      FilterConstants.CLASSIFICATION_POPULATE
    );

    return { categories, subCategories, classifications };
  }

  private computeCategorizationCount(
    globalCatalogueProducts: any[],
    categorizationType: string
  ): any[] {
    const productsCountMap: {
      [id: string]: any;
    } = {};

    globalCatalogueProducts.forEach((item) => {
      const id = item[categorizationType]?._id?.toString();
      if (!productsCountMap[id] && id) {
        productsCountMap[id] = {
          id: id,
          [categorizationType + "Name"]:
            item[categorizationType]?.[categorizationType + "Name"],
          productsCount: 0,
        };
      }
      if (id) {
        productsCountMap[id].productsCount++;
      }
    });

    return Object.values(productsCountMap).map((categorization) => ({
      ...categorization,
      productsCount: categorization?.productsCount,
    }));
  }
}

export default StoreCatalogueHelperService;

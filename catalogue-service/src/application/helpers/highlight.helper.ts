import { ContainerTypes } from "../../api/bindings/container-types";
import { inject, injectable } from "inversify";
import { FilterConstants } from "../constants/filter.constants";
import { IHighlightHelperService } from "../contracts/helper/i-highlight.helper.service";
import { IGlobalCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { IStoreCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { HighlightFilterModel } from "../../domain/models/catagories/filter/highlight-filter.model";
import { StoreCatalogueModel } from "../../domain/models/catalogues/store-catalogue.model";
import FilterTypeEnum from "../../infrastructure/enums/filter.enum";
import { HighlightModel } from "../../domain/models/catagories/highlight.model";

@injectable()
class HighlightHelperService implements IHighlightHelperService {
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  async syncProductHighlights(
    highlight: HighlightFilterModel,
    filterType: string
  ) {
    let productIds: any[] = [];
    let highlightId = highlight?.highlightId;
    let businessUnitId = highlight?.businessUnitId;

    if (filterType === FilterConstants.SYNC_HIGHLIGHT_PRODUCTS && highlightId) {
      productIds = await this.syncHighlightInStores(
        highlightId,
        productIds,
        businessUnitId
      );
    } else if (filterType === FilterConstants.SYNC_HIGHLIGHT_FOR_DELETE) {
      await this.syncStoreCatalogForHighlightDelete(highlightId);
    } else {
      await this.syncHighlightWithProductId(highlight);
    }
    return {
      message: FilterConstants.PRODUCT_HIGHLIGHTS_SYNC_SUCESSFUL,
      productIds,
    };
  }

  private async syncHighlightWithProductId(highlight: HighlightFilterModel) {
    let globalCatalog: any =
      await this.globalCatalogueRepository.getGlobalCatalogue({
        _id: highlight?.storeProductId,
      });
    let { highlights = [], productId } = globalCatalog;

    if (productId && highlights) {
      let storeProducts: any =
        await this.storeCatalogueRepository.filterStoreCatalogues({
          productIds: [productId],
          deleteFlag: false,
        });

      await this.updateProductsWithHighlights(storeProducts, highlights);
    }
  }

  private async updateProductsWithHighlights(
    storeProducts: StoreCatalogueModel[],
    highlightIds: string[]
  ) {
    for (const { id, highlights = [] } of storeProducts) {
      const storeProductId = id || "";
      let storeProduct: any = {};

      if (!highlightIds) {
        highlightIds = [];
      }
      const combinedHighlights = [
        ...new Set([...highlights, ...highlightIds].filter(Boolean)),
      ];
      storeProduct.highlights = combinedHighlights || [];
      await this.storeCatalogueRepository.updateStoreCatalogue(
        storeProductId,
        storeProduct
      );
    }
  }

  private async syncStoreCatalogForHighlightDelete(highlightId: string) {
    let globalCatalogProducts: any =
      await this.globalCatalogueRepository.filterGlobalCatalogues({
        highlights: [highlightId],
        deleteFlag: false,
      });

    let storeCatalogProducts: any =
      await this.storeCatalogueRepository.filterStoreCatalogues({
        highlightIds: [highlightId],
        deleteFlag: false,
      });

    let globalCataloguesForUpdate = globalCatalogProducts?.map((e: any) => {
      return {
        update: {
          filter: { _id: e.id },
          update: {
            highlights: e.highlights?.filter((h: any) => h != highlightId),
          },
        },
      };
    });

    this.globalCatalogueRepository.updateGlobalCatalogues(
      globalCataloguesForUpdate
    );

    let storeCataloguesForUpdate = storeCatalogProducts.map((e: any) => {
      return {
        update: {
          filter: { _id: e.id },
          update: {
            highlights: e.highlights?.filter((h: any) => h != highlightId),
          },
        },
      };
    });
    this.storeCatalogueRepository.updateStoreCatalogues(
      storeCataloguesForUpdate
    );
  }

  private async syncHighlightInStores(
    highlightId: string,
    productIds: any[],
    businessUnitId: string
  ) {
    let globalCatalogProducts: any =
      await this.globalCatalogueRepository.filterGlobalCatalogues(
        {
          highlights: [highlightId],
          deleteFlag: false,
          businessUnitId: businessUnitId,
        },
        FilterTypeEnum.NO_POPULATE
      );

    let storeCatalog = globalCatalogProducts.map((e: any) => {
      return {
        updateMany: {
          filter: { productId: e.productId },
          update: { $addToSet: { highlights: highlightId } },
        },
      };
    });
    await this.storeCatalogueRepository.updateStoreCatalogues(storeCatalog);
    productIds = globalCatalogProducts
      ?.map((item: any) => item.productId)
      .filter(Boolean);
    return productIds;
  }
}

export default HighlightHelperService;

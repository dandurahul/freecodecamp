import { StoreCatalogueFilterModel } from "../../../api/models/store-catalogue-product-filter.model";
import { GlobalCatalogueModel } from "../../../domain/models/catalogues/global-catalogue.model";

export interface IMobileCatalogueHelperService {
  getMobileCatalogueDetails(
    storeCatalogue: StoreCatalogueFilterModel,
    globalCatalogueProducts: GlobalCatalogueModel[],
    pageSize: number,
    page: number,
    extendedCatalogFlag: boolean
  ): Promise<any>;
}

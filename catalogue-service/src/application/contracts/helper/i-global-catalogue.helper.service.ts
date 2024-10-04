import { GlobalCatalogueModel } from "../../../domain/models/catalogues/global-catalogue.model";

export interface IGlobalCatalogueHelperService {
  getGlobalCatalogueDetails(
    filterCriteria: Object,
    extendedCatalogFlag: boolean,
    filterType: string
  ): Promise<GlobalCatalogueModel[]>;
}

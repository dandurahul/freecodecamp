
export interface IStoreCatalogueFilterService {
  getProductCountBasedOnStores(filterCriteria: any): Promise<any>;
  getUnSyncedProductBasedOnStores(highlightId: any): Promise<any[]>;
}

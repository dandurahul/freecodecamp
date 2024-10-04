export interface IExtendedCatalogueHelperService {
  updateExtendedCatalogueProducts(
    subCategoryId: string | undefined,
    classificationId: string | undefined,
    type: string
  ): Promise<any>;
}

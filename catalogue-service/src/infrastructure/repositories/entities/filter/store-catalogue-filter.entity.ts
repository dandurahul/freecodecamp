export interface StoreCatalogueFilterEntity {
  ids: string[];
  categoryId: string | undefined;
  categoryIds: string[];
  subCategoryId: string | undefined;
  subcategoryIds: string[];
  classificationId: string | undefined;
  classificationIds: string[];
  highlightId: string | undefined;
  highlightIds: string[];
  activeFlag: boolean;
}

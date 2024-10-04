import { Types } from "mongoose";

export interface ExtendedGlobalCatalogue {
  globalCatalogueProducts: any[];
  globalCatalogue: string;
  productId: string;
  categoryId: string;
  subCategoryId: string;
  classificationId: string;
  secondaryCategory: Types.ObjectId[];
  secondarySubCategory: Types.ObjectId[];
  secondaryIds: string[];
  creationDate: Date;
  type: string;
}

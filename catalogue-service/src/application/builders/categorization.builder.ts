import { PaginationModel } from "../../domain/models/pagination/pagination.model";
import { ExtendedGlobalCatalogue } from "../../domain/models/catalogues/extended-global-catalog-product.model";
import { FilterConstants } from "../constants/filter.constants";

export const buildPaginationObject = (
  pageCount: number,
  pageSize: number
): PaginationModel => {
  return {
    pageSize: pageSize,
    pageCount: pageCount,
    noOfPages: pageSize ? pageCount / pageSize : 1,
  };
};

export const buildProductFilterResponse = (
  productList: any,
  totalCount: number,
  pageSize: number | undefined
) => {
  let result: any;
  const size = pageSize ? totalCount / pageSize : 1;
  result = Promise.resolve({
    data: productList,
    pagination: {
      pageCount: totalCount,
      pageSize: pageSize,
      noOfPages: size,
    },
  }).catch();
  return result;
};

export const buildExtendedGlobalCatalogue = ({
  globalCatalogueProducts,
  categoryId,
  subCategoryId,
  classificationId,
  secondaryIds,
  type,
}: Partial<ExtendedGlobalCatalogue>) => {
  return globalCatalogueProducts?.map((catalogId) => {
    const extendedCatalogue: Partial<ExtendedGlobalCatalogue> = {
      globalCatalogue: catalogId?._id,
      productId: catalogId?.productId,
      ...(categoryId && { categoryId }),
      ...(subCategoryId && { subCategoryId }),
      ...(classificationId && { classificationId }),
      [type === FilterConstants.SUB_CATEGORY
        ? "secondaryCategory"
        : "secondarySubCategory"]:
        type === FilterConstants.SUB_CATEGORY ? secondaryIds : [],
      creationDate: new Date(),
    };
    return extendedCatalogue;
  });
};

import { StoreCatalogueVariantModel } from "../../domain/models/catalogues/store-catalogue-variants.model";
import { VariantRequestModel } from "../../domain/models/catalogues/variant-update-request.model";
import { IWebCatalogueEntity } from "../../infrastructure/repositories/entities/catalogues/web-catalogues.entity";
import { FilterConstants } from "../constants/filter.constants";
import { removeUndefinedFromArray } from "../utils/filter-functions";

export const calculateCategorizationCount = (
  globalCatalogueProducts: any,
  productIds: any
) => {
  try {
    const filteredData = globalCatalogueProducts?.filter((item: any) =>
      productIds?.includes(item?.productId?.toString())
    );
    let categories = computeCategorizationCount(
      filteredData,
      FilterConstants.CATEGORY_POPULATE
    );
    let subCategories = computeCategorizationCount(
      filteredData,
      FilterConstants.SUB_CATEGORY_POPULATE
    );
    let classifications = computeCategorizationCount(
      filteredData,
      FilterConstants.CLASSIFICATION_POPULATE
    );
    return { categories, subCategories, classifications };
  } catch (e) {
    console.log(e);
  }
};

const computeCategorizationCount = (
  globalCatalogueProducts: any[],
  categorizationType: string
): any[] => {
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
};

export const updateProductVariant = (
  variants: VariantRequestModel[],
  webProducts: IWebCatalogueEntity[]
): StoreCatalogueVariantModel[] => {
  let variantsToUpdate = variants?.map((variant) => {
    const {
      productVariantIndex,
      stockBalance = 0,
      price,
      type,
      productId,
      entityInternalId,
    } = variant;

    const productVariants: any = webProducts?.find(
      (e) => e.productId == productId && e.entityInternalId == entityInternalId
    )?.variants;
    if (!productVariants) return;
    let variantToUpdate: StoreCatalogueVariantModel = productVariants.find(
      (e: StoreCatalogueVariantModel) =>
        e.productVariantIndex == productVariantIndex
    );
    let newVariant: Partial<StoreCatalogueVariantModel> = {};

    if (type === FilterConstants.STOCK_UPDATE) {
      newVariant.stockBalance = stockBalance >= 0 ? stockBalance : 0;
    } else if (type === FilterConstants.PRICE_UPDATE && price) {
      const { discount = 0, discountType = FilterConstants.VALUE_DISCOUNT } =
        variantToUpdate;
      const newSalesPrice =
        discountType === FilterConstants.PERCENTAGE_DISCOUNT
          ? price * (1 - discount / 100)
          : price - discount;
      newVariant.salesPrice = newSalesPrice;
      newVariant.price = price;
    }
    newVariant.id = variantToUpdate.id ?? variantToUpdate._id;
    return newVariant;
  });
  return removeUndefinedFromArray(variantsToUpdate);
};

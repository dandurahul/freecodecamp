import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForUnavailableProduct } from "../../constants/filter-criteria.constants";
import { FilterBase } from "../entities/filter/filter.base";

export function buildRequestForForUnavailableProduct(
  serialized: any
): FilterBase {
  let UnavailableProduct: any = getObjectForFilterQuery(
    serialized,
    filterCriteriaForUnavailableProduct
  );
  if (serialized?.startDate && serialized.endDate) {
    UnavailableProduct.creationDate = {
      $gte: new Date(serialized?.startDate),
      $lte: new Date(serialized?.endDate),
    };
  }
  return UnavailableProduct;
}

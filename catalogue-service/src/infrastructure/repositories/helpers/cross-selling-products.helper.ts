import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForCrossSellingProducts } from "../../constants/filter-criteria.constants";
import { CrossSellingProductsFilterEntity } from "../entities/filter/cross-selling-products-filter.entity";
import { FilterBase } from "../entities/filter/filter.base";

export function buildRequestForForCrossSellingProducts(
  serialized: CrossSellingProductsFilterEntity
): FilterBase {
  let crossSellingProducts: any = getObjectForFilterQuery(
    serialized,
    filterCriteriaForCrossSellingProducts
  );
  crossSellingProducts.deleteFlag = false;
  return crossSellingProducts;
}

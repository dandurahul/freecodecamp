import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { ReserveQuantityFilterModel } from "../../../domain/models/reserved/reserved-quantity-filter.model";
import { filterCriteriaForReservedQuantity } from "../../constants/filter-criteria.constants";
import { CrossSellingProductsFilterEntity } from "../entities/filter/cross-selling-products-filter.entity";
import { FilterBase } from "../entities/filter/filter.base";

export function buildRequestForForReservedQuantity(
  serialized: ReserveQuantityFilterModel
): FilterBase {
  let reservedQuantity: any = getObjectForFilterQuery(
    serialized,
    filterCriteriaForReservedQuantity
  );
  reservedQuantity.deleteFlag = false;
  return reservedQuantity;
}

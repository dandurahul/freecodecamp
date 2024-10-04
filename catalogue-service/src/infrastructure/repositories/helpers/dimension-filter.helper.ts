import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForDimension } from "../../constants/filter-criteria.constants";
import { FilterBase } from "../entities/filter/filter.base";

export function buildRequestForDimension(
    serialized: any,
    filterType: string
): FilterBase {
    let reservedQuantity: any = getObjectForFilterQuery(
        serialized,
        filterCriteriaForDimension
    );
    reservedQuantity.deleteFlag = false;
    return reservedQuantity;
}

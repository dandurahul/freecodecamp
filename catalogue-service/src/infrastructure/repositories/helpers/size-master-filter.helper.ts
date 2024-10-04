import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForSizeMaster } from "../../constants/filter-criteria.constants";
import { FilterBase } from "../entities/filter/filter.base";

export function buildRequestForSizeMaster(
    serialized: any,
    filterType: string
): FilterBase {
    let sizeMaster: any = getObjectForFilterQuery(
        serialized,
        filterCriteriaForSizeMaster
    );
    return sizeMaster;
}

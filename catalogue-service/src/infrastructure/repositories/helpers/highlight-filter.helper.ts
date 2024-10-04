import { Types } from "mongoose";
import FilterTypeEnum, {
  filterConditionsForProductHighlight,
} from "../../enums/filter.enum";
import { FilterBase } from "../entities/filter/filter.base";
import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForProductHighlight } from "../../constants/filter-criteria.constants";

export function buildFilterObjectForHighlight(
  filterType: string,
  filterCriteria: Object
) {
  return getFilterByFilterType(filterType, filterCriteria);
}

function getFilterByFilterType(
  filterType: string | undefined,
  filterCriteria: Object | undefined
): FilterBase | undefined {
  switch (filterType) {
    case FilterTypeEnum.DROPDOWN: {
      return getFilterForDropdown(filterCriteria);
    }
    case FilterTypeEnum.WEBLIST_WITH_COUNT: {
      return getFilterForWebList(filterCriteria);
    }
    default: {
      return buildRequestObjectForHighlight(filterCriteria);
    }
  }
}

function getFilterForDropdown(filterCriteria: any): FilterBase {
  return {
    filter: { deleteFlag: false, ...filterCriteria },
    fields: "_id productHighlightCode productHighlight",
  };
}

export function getFilterForWebList(serialized: any): FilterBase {
  let aggregate = getAggregateProductCount(serialized.businessUnitId);
  let highlightObject: any = getObjectForFilterQuery(
    serialized,
    filterConditionsForProductHighlight
  );
  highlightObject.deleteFlag = false;
  return {
    filter: highlightObject,
    fields: "",
    populate: "webBanner mobileBanner seo",
    aggregate: aggregate ? aggregate : undefined,
  };
}

function getAggregateProductCount(businessUnitId: string) {
  let aggregationPipeline: any = [
    {
      $match: {
        deleteFlag: false,
        businessUnitId: new Types.ObjectId(businessUnitId),
      },
    },
    {
      $lookup: {
        from: "GlobalCatalog",
        localField: "_id",
        foreignField: "highlights",
        as: "results",
      },
    },
    {
      $addFields: {
        id: "$_id",
        productCount: {
          $sum: { $size: "$results" },
        },
      },
    },
    {
      $project: {
        results: 0,
      },
    },
  ];

  return aggregationPipeline;
}

function buildRequestObjectForHighlight(serialized: any): FilterBase {
  let highlightsObject: any = getObjectForFilterQuery(
    serialized,
    filterCriteriaForProductHighlight
  );
  highlightsObject.deleteFlag = false;
  return {
    filter: highlightsObject,
    sort: "orderValue",
  };
}

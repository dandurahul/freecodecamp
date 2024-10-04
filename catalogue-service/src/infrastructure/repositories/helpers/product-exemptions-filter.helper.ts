import { FilterConstants } from "../../../application/constants/filter.constants";
import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForExemptions } from "../../constants/filter-criteria.constants";
import { ProductExemptionFilterEntity } from "../entities/filter/product-exmptions-filter.entity";

export const buildRequestObjectForProductExemptions = (
  serialized: ProductExemptionFilterEntity,
  filterType: string | undefined
) => {
  let exemptionObject: any;
  let aggregationPipeline: any;
  let activeFlag = filterType === FilterConstants.active ? true : false;
  if (serialized?.productIds) {
    aggregationPipeline = [
      {
        $addFields: {
          productId: { $toString: "$exemptionsValue.datavalue" },
        },
      },
      {
        $match: {
          exemptionsType: serialized?.exemptionsType,
          "exemptionsValue.dataType": "Product_Variant",
          productId: {
            $in: serialized?.productIds?.map((item: any) => String(item)),
          },
          deleteFlag: false,
          activeFlag: activeFlag,
        },
      },
    ];
  } else {
    exemptionObject = getObjectForFilterQuery(
      serialized,
      filterCriteriaForExemptions
    );
    exemptionObject.deleteFlag = false;
  }
  return { query: exemptionObject, aggregate: aggregationPipeline };
};

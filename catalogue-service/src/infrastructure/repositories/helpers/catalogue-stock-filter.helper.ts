import { Aggregate } from "mongoose";
import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForCatalogueStock } from "../../constants/filter-criteria.constants";

export function buildRequestForForCatalogueStock(
  serialized: any,
  filterType: string
): any {
  return getFilterByFilterType(filterType, serialized);
}

function getFilterByFilterType(
  filterType: string | undefined,
  filterCriteria: Object | undefined
): any {
  switch (filterType) {
    case "Ecommerce": {
      return getEcommerceProductsStocks(filterCriteria);
    }
    default: {
      return buildRequestObjectForCatalogueStocks(filterCriteria);
    }
  }

  function buildRequestObjectForCatalogueStocks(serialized: any) {
    let catalogueStock: any = getObjectForFilterQuery(
      serialized,
      filterCriteriaForCatalogueStock
    );

    return { filter: catalogueStock };
  }

  function getEcommerceProductsStocks(filter: any) {
    let aggregate = [
      {
        $match: {
          "stores.entityInternalId": { $in: filter.entityInternalIds },
          productId: { $in: filter.productIds },
        },
      },
      // {
      //   $add: {
      //     productId: 1,
      //     businessUnitId: 1,
      //     itemCodes :{
      //       $push : {
      //         itemCode : "$itemCode",
      //         stores : "$stores"
      //       }
      //     }
      //     // stores: {
      //     //   $map: {
      //     //     input: "$stores",
      //     //     as: "store",
      //     //     in: {
      //     //       $mergeObjects: ["$$store", { itemCode: "$itemCode" }],
      //     //     },
      //     //   },
      //     // },
      //   },
      // },
      {
        $group: {
          _id: "$productId",
          businessUnitId: { $first: "$businessUnitId" },
          itemCodes: { $push: { stores: "$stores", itemCode: "$itemCode" } },
        },
      },
    ];
    return {
      aggregate,
    };
  }
}

import { syncBuiltinESMExports } from "module";
import { CommonService } from "../../application/services/common-service";
import { StoreProductHistoryAdapter } from "../../infrastructure/adapters/internal/store-product-adapter";

const ContainerTypes = {
  IretailController: Symbol.for("IretailController"),
  IretailService: Symbol.for("IretailService"),
  IretailAggregationService: Symbol.for("IretailAggregationService"),
  IretailAdapter: Symbol.for("IretailAdapter"),

  SalesInvoiceController: Symbol.for("SalesInvoiceController"),
  SalesInvoiceAggregationService: Symbol.for("SalesInvoiceAggregationService"),
  SalesInvoiceAdapter: Symbol.for("SalesInvoiceAdapter"),

  AdminAdapter: Symbol.for("adminAdapter"),
  AdminAggregationService: Symbol.for("AdminAggregationService"),

  OrderAdapter: Symbol.for("OrderAdapter"),

  storeAdapter: Symbol.for("storeAdapter"),
  CommonService: Symbol.for("CommonService"),
  productAdapter: Symbol.for("productAdapter"),

  StoreProductHistoryAdapter: Symbol.for(" StoreProductHistoryAdapter"),
};

export { ContainerTypes };

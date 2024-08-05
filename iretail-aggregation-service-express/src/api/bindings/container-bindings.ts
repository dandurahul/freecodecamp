import { Container } from "inversify";
import { ContainerTypes } from "./container-types";
import { IRetailAdapter } from "../../infrastructure/contracts/iretail-adapter";
import IretailAdapter from "../../infrastructure/adapters/internal/iretail.adapter";
import { IRetailAggregationService } from "../../application/services/iretail-aggregation-service";
import { IretailController } from "../controllers/iretail.controller";
import { IiretailController } from "../contracts/i-retail-controller";
import { SalesInvoiceAdapter } from "../../infrastructure/adapters/internal/sales-invoice-adapter";
import { SalesInvoiceAggregationService } from "../../application/services/sales-invoice-aggregation-service";
import { SalesInvoiceController } from "../controllers/sales-invoice.controller";
import { AdminAdapter } from "../../infrastructure/adapters/internal/admin-adapter";
import { AdminAggregationService } from "../../application/services/admin-aggregation-service";
import { OrderAdapter } from "../../infrastructure/adapters/internal/order.adapter";
import { StoreMappingAdapter } from "../../infrastructure/adapters/internal/storemaping-adapter";
import { CommonService } from "../../application/services/common-service";
import { ProductsAdapter } from "../../infrastructure/adapters/internal/products-adapter";
import { StoreProductHistoryAdapter } from "../../infrastructure/adapters/internal/store-product-adapter";

const container = new Container();

function iRetail() {
  container
    .bind<IRetailAdapter>(ContainerTypes.IretailAdapter)
    .to(IretailAdapter);
  container
    .bind<IRetailAggregationService>(ContainerTypes.IretailAggregationService)
    .to(IRetailAggregationService);
  container
    .bind<IiretailController>(ContainerTypes.IretailController)
    .to(IretailController);
}
function SalesInvoice() {
  container
    .bind<SalesInvoiceAdapter>(ContainerTypes.SalesInvoiceAdapter)
    .to(SalesInvoiceAdapter);
  container
    .bind<SalesInvoiceAggregationService>(
      ContainerTypes.SalesInvoiceAggregationService
    )
    .to(SalesInvoiceAggregationService);
  container
    .bind<SalesInvoiceController>(ContainerTypes.SalesInvoiceController)
    .to(SalesInvoiceController);
}
function Admin() {
  container.bind<AdminAdapter>(ContainerTypes.AdminAdapter).to(AdminAdapter);
  container
    .bind<AdminAggregationService>(ContainerTypes.AdminAggregationService)
    .to(AdminAggregationService);
}

function Order() {
  container.bind<OrderAdapter>(ContainerTypes.OrderAdapter).to(OrderAdapter);
}
function StoreAdapter() {
  container
    .bind<StoreMappingAdapter>(ContainerTypes.storeAdapter)
    .to(StoreMappingAdapter);
}
function storeCatelogAdapter() {
  container.bind<CommonService>(ContainerTypes.CommonService).to(CommonService);
}
function ProductAdapter() {
  container
    .bind<ProductsAdapter>(ContainerTypes.productAdapter)
    .to(ProductsAdapter);
}
function StoreProductHistory() {
  container
    .bind<StoreProductHistoryAdapter>(ContainerTypes.StoreProductHistoryAdapter)
    .to(StoreProductHistoryAdapter);
}
Order();
iRetail();
SalesInvoice();
Admin();
StoreAdapter();
storeCatelogAdapter();
ProductAdapter();
StoreProductHistory();
export { container };

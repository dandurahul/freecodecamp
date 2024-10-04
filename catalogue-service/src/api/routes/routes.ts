import express, { Router } from "express";
import bodyParser from "body-parser";
import categoryRoute from "./categories/category.route";
import subCategoryRoute from "./categories/sub-category.route";
import classificationRoute from "./categories/classification.route";
import globalCatalogueRoute from "./catalogues/global-catalogue.route";
import highlightRoute from "./categories/highlight.route";
import storeCataloguesRoute from "./catalogues/store-catalogues.route";
import reservedQuantityRoute from "./reserved-quantity/reserved-quantity.route";
import productExemptionRoute from "./product-exemptions/product-exemptions.route";
import crossSellingProductsRoute from "./cross-selling/cross-selling-products.route";
import androidCataloguesRoute from "./catalogues/android-catalogue.route";

import webCataloguesRoute from "./catalogues/web-catalogues.routes";
import mobileCataloguesRoute from "./catalogues/mobile-catalogues.routes";
import posCatalogueRoute from "./catalogues/pos-catalogue.route";
import iosCatalogueRoute from "./catalogues/ios-catalogue.route";
import ExtendedGlobalCatalogRoute from "./catalogues/extended-global-catalog.route";
import UnavailableProductsRoute from "./catalogues/unavailable-products.route";
import CatalogueStockRoute from "./catalogues/catalgue-stock.route";
import ReelSales from "./reel-sales/reel-sales.route";
import DimensionRoute from "./size-master/dimension.routes";
import SizeMasterRoute from "./size-master/size-master.routes";
const app = express();
app.use(bodyParser.json());

app.use("/categories", categoryRoute());
app.use("/sub-categories", subCategoryRoute());
app.use("/classifications", classificationRoute());
app.use("/product-highlights", highlightRoute());
// Global Catalogue Routes
app.use("/global-catalogs", globalCatalogueRoute());

// Store Catelogues Routes
app.use("/store-catalogs", storeCataloguesRoute());
app.use("/stores", storeCataloguesRoute());
app.use("/reserved-quantity", reservedQuantityRoute());
app.use("/product-exemptions", productExemptionRoute());
app.use("/cross-selling-products", crossSellingProductsRoute());
app.use("/android-catalogs", androidCataloguesRoute());
app.use("/web-catalogs", webCataloguesRoute());
app.use("/mobile-catalogs", mobileCataloguesRoute());
app.use("/pos-catalogs", posCatalogueRoute());
app.use("/ios-catalogs", iosCatalogueRoute());
app.use("/catalogue-stocks", CatalogueStockRoute());
app.use("/unavailable-products", UnavailableProductsRoute());
app.use("/extended-global-catalogs", ExtendedGlobalCatalogRoute());
app.use("/reel-sales", ReelSales());
app.use("/dimension", DimensionRoute());
app.use("/size-master", SizeMasterRoute());

export default app;

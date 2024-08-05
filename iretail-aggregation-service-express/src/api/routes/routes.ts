import express from "express";
import bodyParser from "body-parser";
import IRetailRouter from "./iretail.router";
import SalesInvoiceRouter from "./sales-invoice.router";

const app = express();
app.use(bodyParser.json());

app.use("/i-retail", IRetailRouter());
app.use("/sales-invoice", SalesInvoiceRouter());
export default app;

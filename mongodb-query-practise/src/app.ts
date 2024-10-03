import express from "express";
import {Container} from "inversify"
import dotenv from "dotenv"
import { DBInit } from "./database-source/database-connection";
import { InversifyExpressServer } from "inversify-express-utils";
// import routes from "../src/routes/route"
const app = express();
dotenv.config();
DBInit()
const PORT = process.env.PORT || 1001;

// app.use("/" + process.env.CONTEXT_PATH,routes)
let container= new Container()
let server= new InversifyExpressServer(container,null,{
  

})
app.listen(PORT, () => {
  console.log(`mongodb server is running on port ${PORT} :)`);
});

import Router from "express";
import playerRoute from "./player-route";



const router = Router();

router.use("/user", playerRoute())


export { router };

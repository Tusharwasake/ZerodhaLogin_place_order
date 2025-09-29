import { Router } from "express";
import {
  getTrades,
  getPositions,
  getHoldings,
} from "../controllers/portfolioController.js";

const Portfolioroutes = Router();

Portfolioroutes.get("/trades", getTrades);
Portfolioroutes.get("/positions", getPositions);
Portfolioroutes.get("/holdings", getHoldings);

export default Portfolioroutes;

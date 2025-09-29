import express from "express";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";

const watchlistRoutes = express.Router();

watchlistRoutes.get("/", getWatchlist);
watchlistRoutes.post("/add", addToWatchlist);
watchlistRoutes.post("/remove", removeFromWatchlist);

export default watchlistRoutes;

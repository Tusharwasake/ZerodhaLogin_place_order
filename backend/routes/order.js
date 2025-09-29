import { Router } from "express";
import {
  placeOrder,
  getOrders,
  getOrderHistory,
  cancelOrder,
  modifyOrder,
} from "../controllers/orderController.js";

const orderRoutes = Router();

// Order management routes
orderRoutes.post("/", placeOrder);
orderRoutes.get("/", getOrders);
orderRoutes.get("/history/:order_id", getOrderHistory);
orderRoutes.delete("/:order_id", cancelOrder);
orderRoutes.put("/:order_id", modifyOrder);

export default orderRoutes;

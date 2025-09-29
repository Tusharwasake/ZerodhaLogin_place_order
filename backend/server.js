import express from "express";
import { db } from "./database/db.js";
import kiteRoutes from "./routes/kite.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import orderRoutes from "./routes/order.js";
import Portfolioroutes from "./routes/portfolio.js";

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/kite", kiteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/portfolio", Portfolioroutes);

app.listen(PORT, () => {
  console.log(`Server Started at: http://localhost:${PORT}`);
  db();
});

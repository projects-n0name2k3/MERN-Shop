import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth-routes.js";
import adminRoute from "./routes/admin-routes.js";
import shopRoute from "./routes/shop-routes.js";
import cartRoute from "./routes/cart-routes.js";
import favRoute from "./routes/fav-routes.js";
import addressRoute from "./routes/address-routes.js";
import adminOrderRoute from "./routes/admin-order-routes.js";
import shopOrderRouter from "./routes/shop-order-routes.js";
import shopSearchRouter from "./routes/search-routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", " POST", " PUT", " DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/admin/products", adminRoute);
app.use("/api/shop", shopRoute);
app.use("/api/shop/cart", cartRoute);
app.use("/api/shop/favourite", favRoute);
app.use("/api/shop/address", addressRoute);
app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

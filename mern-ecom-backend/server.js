import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import cloudinaryImagesRoutes from "./routes/cloudinaryImagesRoutes.js";
import brandRoutes from "./routes/brandRoute.js";
import productCategoriesRoutes from "./routes/productCategoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Frontend origin
  credentials: true, // Accept credentials (cookies, etc.)
};

app.use(cors(corsOptions));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/cloudinary-images", cloudinaryImagesRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/product-categories", productCategoriesRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// app.get('/api/config/paypal', (req, res) =>
//   res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
// );

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(
    express.static(path.join(__dirname, "/mern-ecom-frontend-client/build"))
  );

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        "mern-ecom-frontend-client",
        "build",
        "index.html"
      )
    )
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);

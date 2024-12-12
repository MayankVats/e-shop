import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log("Server started on port " + PORT));

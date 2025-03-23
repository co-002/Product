import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./DB_connection.js";
import productRouter from "./routes/product.js";
import materialRouter from "./routes/material.js";
import gradeRouter from "./routes/grade.js";
import productCombination from "./routes/productCombination.js";
import cors from "cors";
import bodyParser from "body-parser";

// https://chatgpt.com/c/67dd98f6-531c-8002-a1a3-bc058376aecd

const app = express();
dbConnection();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/product", productRouter);

app.use("/api/material", materialRouter);

app.use("/api/grade", gradeRouter);

app.use("/api/productCombination", productCombination);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port: ", process.env.PORT);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import saleRoutes from "./src/routes/saleRoutes.js";
import { importCSV } from "./src/utils/importCsv.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

importCSV();

app.use("/api/sales", saleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import "dotenv/config";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";

import approvalRoutes from "./src/routes/AdminApproval.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to database
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", approvalRoutes);
export default app;

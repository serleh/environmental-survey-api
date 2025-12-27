import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import cors from "cors";

import approvalRoutes from "./src/routes/AdminApproval.js";
import surveyRoutes from "./src/routes/adminSurvey.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", approvalRoutes);
app.use("/api/admin/surveys", surveyRoutes);
export default app;

import express from "express";

import {
  addQuestionController,
  createSurveyController,
  deleteSuveyController,
  publishSurveyController,
  updateSurveyController,
} from "../controllers/survey.js";
import { authenticate } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";

const router = express.Router();

router.post("/", authenticate, requireAdmin, createSurveyController);
// add a survey question
router.post(
  "/:surveyId/questions",
  authenticate,
  requireAdmin,
  addQuestionController
);

// publish a survey
router.post(
  "/:surveyId/publish",
  authenticate,
  requireAdmin,
  publishSurveyController
);

// edit survey
router.put("/:surveyId/", authenticate, requireAdmin, updateSurveyController);

// Delete a survey
router.delete("/:survryId", authenticate, requireAdmin, deleteSuveyController);

export default router;

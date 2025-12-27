import { Survey } from "../models/Survey.js";
import { Question } from "../models/Question.js";

export const CreateSurvey = async ({
  title,
  description,
  targetAudience,
  adminId,
}) => {
  const survey = await Survey.create({
    title,
    description,
    targetAudience,
    createdBy: adminId,
  });
  return survey;
};

// Add Question to a Survey

export const addQuestion = async ({ surveyId, questionData }) => {
  const survey = await Survey.findById(surveyId);

  if (!survey) {
    throw new Error("Survey not found");
  }

  if (survey.status !== "DRAFT") {
    throw new Error("Cannot modify a published survey");
  }

  const question = await Question.create({ survey: surveyId, ...questionData });

  return question;
};

// Publish a Survey

export const publishSurvey = async (surveyId) => {
  const survey = await Survey.findById(surveyId);

  if (!survey) {
    throw new Error("Survey not found");
  }
  survey.status = "PUBLISHED";
  await survey.save();

  return survey;
};

// Edit a Survey
export const updateSurvey = async (surveyId, updateData) => {
  const survey = await Survey.findById(surveyId);

  if (!survey) {
    throw new Error("Survey not found");
  }
  if (survey.status !== "DRAFT") {
    throw new Error("Only draft surveys can be edited");
  }
  // Allowed fields only
  const allowedUpdates = ["title", "description", "targetAudience"];

  allowedUpdates.forEach((field) => {
    if (updateData[field] !== undefined) {
      survey[field] = updateData[field];
    }
  });
  await survey.save();
  return survey;
};

// Delete a Survey
export const deleteSurvey = async (surveyId) => {
  const survey = await Survey.findById(surveyId);

  if (!survey) {
    throw new Error("Survey not found");
  }
  if (survey.status !== "DRAFT") {
    throw new Error("Only draft surveys can be deleted");
  }
  await survey.deleteOne();
  return survey;
};

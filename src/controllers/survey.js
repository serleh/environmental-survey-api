import {
  CreateSurvey,
  addQuestion,
  deleteSurvey,
  publishSurvey,
  updateSurvey,
} from "../services/survey.js";

export const createSurveyController = async (req, res) => {
  const { title, description, targetAudience } = req.body;
  try {
    const survey = await CreateSurvey({
      title,
      description,
      targetAudience,
      adminId: req.user.id,
    });
    res.status(201).json(survey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addQuestionController = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const question = await addQuestion({ surveyId, questionData: req.body });
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Publish survey
export const publishSurveyController = async (req, res) => {
  try {
    const survey = await publishSurvey(req.params.surveyId);
    res.status(200).json(survey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit survey controller
export const updateSurveyController = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const updatedSurvey = await updateSurvey(surveyId, req.body);
    res.status(200).json(updatedSurvey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a survey
export const deleteSuveyController = async (req, res) => {
  try {
    const { surveyId } = req.params;
    await deleteSurvey(surveyId);

    res.status(200).json({
      message: "Survey deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    targetAudience: { type: String, enum: ["STUDENT", "FACULTY", "BOTH"] },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CLOSED"],
      default: "DRAFT",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Admin
      required: true,
    },
  },
  { timestamps: true }
);

surveySchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export const Survey = mongoose.model("Survey", surveySchema);

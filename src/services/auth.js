import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { StudentProfile } from "../models/StudentProfile.js";
import { StaffProfile } from "../models/StaffProfile.js";

export const registerUser = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, role, institutionId, password } = data;

    //Check for existing user
    const existingUser = await User.findOne({ institutionId });
    if (existingUser) {
      throw new Error("User already registered");
    }

    const user = await User.create(
      [
        {
          name,
          role,
          institutionId,
          password,
        },
      ],
      { session }
    );

    if (role === "STUDENT") {
      await StudentProfile.create(
        [
          {
            user: user[0].id,
            class: data.class,
            specialization: data.specialization,
            section: data.section,
            admissionDate: data.admissionDate,
          },
        ],
        { session }
      );
    }
    if (role === "FACULTY") {
      await StaffProfile.create(
        [
          {
            user: user[0].id,
            specialization: data.specialization,
            dateOfJoining: data.dateOfJoining,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();
    session.endSession();

    return user[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// User login

export const userLogin = async ({ institutionId, password }) => {
  const user = await User.findOne({ institutionId });
  if (!user) throw new Error("User not found");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid Credentials");

  // Only  users approved by admin should login
  if (user.role !== "ADMIN" && user.status !== "ACTIVE") {
    throw new Error("Your account is not approved yet");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return { token, userId: user.id, role: user.role };
};

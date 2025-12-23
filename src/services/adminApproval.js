import { StaffProfile } from "../models/StaffProfile.js";
import { StudentProfile } from "../models/StudentProfile.js";
import { User } from "../models/User.js";

export const approveUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status === "ACTIVE") {
    throw new Error("User already approved");
  }

  if (user.status === "ADMIN") {
    throw new Error("Admin does not require approval.");
  }
  user.status = "ACTIVE";
  await user.save();

  return user;
};

// Reject a user
export const rejectUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }
  user.status = "REJECTED";
  await user.save();

  return user;
};

// Delete a user
export const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "STUDENT") {
    await StudentProfile.deleteOne({ user: userId });
  }

  if (user.role === "FACULTY") {
    await StaffProfile.deleteOne({ user: userId });
  }
  await user.deleteOne();
  return user;
};

// Get all pending users
export const getPendingUsers = async () => {
  return User.find({ status: "PENDING", role: { $ne: "ADMIN" } }).select(
    "-password"
  );
};

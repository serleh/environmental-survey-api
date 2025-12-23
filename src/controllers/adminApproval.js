import {
  approveUser,
  rejectUser,
  getPendingUsers,
  deleteUser,
} from "../services/adminApproval.js";

export const approveUserController = async (req, res) => {
  try {
    const user = await approveUser(req.params.id);

    res.json({
      message: "User approved Sucessfully",
      userId: user.id,
      status: user.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reject user
export const rejectUserController = async (req, res) => {
  try {
    const user = await rejectUser(req.params.id);
    res.json({ message: "User rejected", userId: user.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get pending users
export const getPendingUsersController = async (req, res) => {
  try {
    const users = await getPendingUsers();

    res.status(200).json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a User
export const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    if (err.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

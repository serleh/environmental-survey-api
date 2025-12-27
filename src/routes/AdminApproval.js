import express from "express";
import {
  approveUserController,
  deleteUserController,
  rejectUserController,
} from "../controllers/adminApproval.js";

import { requireAdmin } from "../middlewares/requireAdmin.js";
import { authenticate } from "../middlewares/auth.js";
import { getPendingUsersController } from "../controllers/adminApproval.js";

const router = express.Router();

// Approve user
router.patch(
  "/admin/users/:id/approve",
  authenticate,
  requireAdmin,
  approveUserController
);

//Reject user
router.patch(
  "/admin/users/:id/reject",
  authenticate,
  requireAdmin,
  rejectUserController
);

router.delete(
  "/admin/users/:id",
  authenticate,
  requireAdmin,
  deleteUserController
);
// Get pending users
router.get(
  "/admin/users/pending",
  authenticate,
  requireAdmin,
  getPendingUsersController
);

export default router;

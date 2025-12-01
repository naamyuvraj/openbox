import express from 'express';
import {
  updateBioAvatar,
  getProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticateToken);

// Get user profile
router.get('/profile', getProfile);

// Update user bio and avatar
router.put('/profile', updateBioAvatar);
// password chnage karn ahai 
router.post("/change-password", authenticateToken, changePassword);

export default router;
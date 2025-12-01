import express from 'express';
import {updateBioAvatar , getProfile} from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticateToken);

// Get user profile
router.get('/profile', getProfile);

// Update user bio and avatar
router.put('/profile', updateBioAvatar);

export default router;
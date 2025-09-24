import express from 'express'
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.contoller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'


const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile); // protectRoute middleware to protect this route

router.get('/checkAuth', protectRoute, checkAuth);

export default router;
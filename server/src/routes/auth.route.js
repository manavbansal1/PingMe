import express from 'express'
import { signup, login, logout, updateProfile } from '../controllers/auth.contoller.js'

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('update-profile', protectRoute, updateProfile); // protectRoute middleware to protect this route

export default router;
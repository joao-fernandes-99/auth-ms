import express from "express";
import { login, validate } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/validate', validate)

export default router;
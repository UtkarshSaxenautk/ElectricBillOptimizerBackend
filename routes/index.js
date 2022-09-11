import express from 'express';
import { createUser, readAppliances } from '../controller/index.js';

const router = express.Router();
router.get('/:user_id', readAppliances);
router.post('/', createUser);
export default router;
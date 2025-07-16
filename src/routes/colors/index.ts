import express from 'express';
import { createColor, getColors } from '../../controllers/colors';

const router = express.Router();

router.post('/', createColor);
router.get('/', getColors);

export default router;
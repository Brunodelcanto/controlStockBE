import express from 'express';
import { activateColor, createColor, deactivateColor, deleteColor, getColorById, getColors, updateColor,  } from '../../controllers/colors';

const router = express.Router();

router.post('/', createColor);
router.get('/', getColors);
router.get('/:id', getColorById);
router.delete('/:id', deleteColor);
router.put('/:id', updateColor);
router.patch('/:id/deactivate', deactivateColor);
router.patch('/:id/activate', activateColor);


export default router;
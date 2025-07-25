import express from 'express';
import { createCategory, deleteCategory, updateCategory, getCategories, getCategoryById, deactivateCategory, activateCategory } from '../../controllers/categories';
    
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategory);
router.patch('/:id', updateCategory);
router.patch('/:id/deactivate', deactivateCategory);
router.patch('/:id/activate', activateCategory);


export default router;
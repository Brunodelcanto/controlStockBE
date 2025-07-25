import express from 'express';;
import { createProduct, getProducts, getProductById, deleteProduct, deactivateProduct, activateProduct, adjustProductStock, updateProduct } from '../../controllers/products';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);
router.patch('/:id/deactivate', deactivateProduct);
router.patch('/:id/activate', activateProduct);
router.patch('/:id/adjust-stock', adjustProductStock);

export default router;

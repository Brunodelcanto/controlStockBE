import express from 'express';
import colorRouter from './colors';
import categoryRouter from './categories';
import productRouter from './products';

const router = express.Router();

router.use('/colors', colorRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);

export default router;
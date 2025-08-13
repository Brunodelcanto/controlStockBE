import express from 'express';
import colorRouter from './colors';
import categoryRouter from './categories';
import productRouter from './products';
import uploadRouter from './upload';

const router = express.Router();

router.use('/colors', colorRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/upload', uploadRouter);

export default router;
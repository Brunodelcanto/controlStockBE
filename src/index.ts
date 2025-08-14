import express from 'express';
import cors from 'cors';
import routes from './routes';
import "dotenv/config";
import connectDB from './database';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'https://control-de-stock-cheelmate-9np7.onrender.com'],
    credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
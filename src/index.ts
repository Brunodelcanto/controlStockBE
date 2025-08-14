import express from 'express';
import cors from 'cors';
import routes from './routes';
import "dotenv/config";
import connectDB from './database';

const app = express();

const PORT = process.env.PORT || 3000;

// CORS configurado para producción
app.use(cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
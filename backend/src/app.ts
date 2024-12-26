import express, {Response, Request} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';

dotenv.config();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use("/api/v1/todo", todoRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

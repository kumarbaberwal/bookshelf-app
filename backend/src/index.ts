import express, { Request, Response } from 'express';
import { ENV_VARS } from './configs/config';
import authRouter from './routes/authRoutes'
import { connectDB } from './databases/db';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hi.. Kumar"
    })
})

app.use('/auth', authRouter);

const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
    connectDB();
})
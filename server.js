import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import authRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 99
});

app.use(helmet());
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

app.listen(PORT, ()=> {
    console.log(`Auth service running on port: ${PORT}`);
})

export default app;

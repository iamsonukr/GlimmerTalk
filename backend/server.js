import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth.routes.js';
import { connectDB } from './config/connectDB.config.js';
import cors from 'cors';
import messageRouter from './routes/message.routes.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import { app, server } from './socket/socket.js';

// Variables
const PORT = process.env.PORT || 5000;  // Fallback port if not defined in .env

// Middlewares
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5002',
    credentials: true
}));

app.use(express.json()); // Parse incoming JSON payload from req.body
app.use(express.urlencoded({ extended: true })); // Fixes typo: 'extended', not 'extends'

// Routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send("Hello Jarvis");
});

// Server listener with error handling
server.listen(PORT, async () => {
    try {
        await connectDB();  // Ensure database connection
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
});

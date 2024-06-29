import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from 'dotenv';
import authRouter from './routes/auth'; // Adjust path based on your project structure
import dashboardRouter from './routes/dashboard'; // Import your dashboard route
import reportRouter from './routes/report'; // Import your dashboard route


config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure process.env variables are defined or provide defaults
const {MONGO_URI, PORT} = process.env;

if (!MONGO_URI) {
    console.error('MongoDB connection string is not provided.');
    process.exit(1);
}

// Connect to MongoDB with type assertion
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as any)
    .then(() => console.log('MongoDB connected'))
    .catch((error: Error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });

// Routes
app.use('/api/auth', authRouter);
app.use('/api', dashboardRouter);
app.use('/api/report', reportRouter);

const serverPort = PORT ? parseInt(PORT, 10) : 5000;
app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));

// Example dashboard route
import express from 'express';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from "../models/user";

const router = express.Router();

// Middleware to verify JWT
function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Authorization: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.body.userId = (decoded as any).userId; // Attach userId to request object for further use
        next();
    });
}

// Protected route
router.get('/dashboard', verifyToken, (req: Request, res: Response) => {
    // Assuming req.user contains decoded token data
    const userId = req.body.userId; // Access userId from decoded token

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'Dashboard content here', user });
        }).catch(err => res.status(500).json({ message: 'Server error' }));

    res.json({ message: 'Dashboard content here', userId });
});

export default router;

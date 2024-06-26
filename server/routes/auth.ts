import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user'; // Adjust path and import for your User model
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // If credentials are valid, generate JWT token
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Server error');
                }
                // Send token and user info back to client
                if (!user) {
                    return res.status(400).json({ msg: 'User not found' });
                }
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.name,
                        email: user.email
                    }
                });
            }
        );
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;

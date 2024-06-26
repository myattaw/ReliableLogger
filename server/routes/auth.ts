import {Request, Response, Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user'; // Adjust path and import for your User model
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
    const {name, email, password} = req.body as { name: string; email: string; password: string };
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({name, email, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {user: {id: user.id}};
        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({token});
            }
        );
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body as { email: string; password: string };
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const payload = {user: {id: user.id}};
        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        );
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
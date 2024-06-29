import {Request, Response, Router} from 'express';
import Plugin from '../models/plugin';

import dotenv from 'dotenv';
import User from "../models/user";

dotenv.config();

const router = Router();

// Login
router.post('/create', async (req: Request, res: Response) => {
    const {email, plugin} = req.body as { email: string; plugin: string };
    try {

        let user = await User.findOne({email});
        if (!user) { //
            return res.status(400).json({msg: 'Invalid User email'});
        }

        let pluginExist = await Plugin.findOne({plugin});
        if (pluginExist) {
            return res.status(400).json({msg: 'A user has already registered this file to their account'});
        }

        let pluginData = new Plugin({email, plugin})
        await pluginData.save();

    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


export default router;

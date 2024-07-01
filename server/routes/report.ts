import { Request, Response, Router } from 'express';
import Plugin from '../models/plugin';
import dotenv from 'dotenv';
import User from "../models/user";
import Error from "../models/error";

dotenv.config();

const router = Router();

// Create plugin report tracker
router.post('/create', async (req: Request, res: Response) => {
    const { email, name, plugin } = req.body as { email: string, name: string; plugin: string };
    try {
        console.log('Received create request:', req.body);

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid User email' });
        }

        let pluginExist = await Plugin.findOne({ plugin });
        if (pluginExist) {
            return res.status(400).json({ msg: 'A user has already registered this file to their account' });
        }

        let pluginData = new Plugin({ email, name, plugin });
        await pluginData.save();

        res.status(201).json({ msg: 'Plugin created successfully' });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create report for plugin
router.post('/error', async (req: Request, res: Response) => {
    const { plugin, message } = req.body as { plugin: string; message: string };
    try {
        console.log('Received error report:', req.body);

        let pluginExist = await Plugin.findOne({ plugin });
        if (!pluginExist) {
            return res.status(400).json({ msg: 'Could not find plugin' });
        }

        let pluginError = new Error({ plugin, message });
        await pluginError.save();

        res.status(201).json({ msg: 'Error report saved successfully' });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;

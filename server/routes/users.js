import express from 'express';
const router = express.Router();

import { User } from '../models/User.js';
import { secret } from '../config/keys.js';

router.post('/test', (req, res) => {
    console.log("test done")
    res.status(200).json({message: "test complete"})
})

export default router;
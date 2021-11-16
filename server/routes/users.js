import express from 'express';
const router = express.Router();

import { User } from '../models/User';
import bcrypt from 'bcrpyt';

import jwt from 'jsonwebtoken';
import { secret } from '../config/keys';

router.post('/test', (req, res) => {
    console.log("test done")
    res.status(200).json({message: "test complete"})
})


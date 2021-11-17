import express from 'express';
const router = express.Router();

import { userValidate } from '../validations/user.js';
import { loginValidate } from '../validations/login.js';

import { User } from '../models/User.js';
import { secret } from '../config/keys.js';

// GET request to get all users api/users/all
router.get('/all', (req, res) => {
    User.find({}, (err, result) =>{
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(result);
        }
    })
});

// POST request to create a new user api/users/register

router.post('/register', (req, res) => {
    const {errors, isValid} = userValidate(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            return res.status(400).json({email: "Email already exists"});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                courses: req.body.courses,
                credits:req.body.credits,
                date: new Date()
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
})

export default router;
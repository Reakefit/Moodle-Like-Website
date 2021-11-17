import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';

import user from './routes/users.js';

import { URI } from './config/keys.js';
import passportFunc from './config/passport.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("Successfully connected to Database"))
.catch(err => console.log(err));

app.use(passport.initialize());
passportFunc (passport);
app.use('/api/users', user);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));



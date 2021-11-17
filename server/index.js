import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { URI } from './config/keys.js';

import user from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("Successfully connected to Database"))
.catch(err => console.log(err));

app.use('/api/users', user);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));



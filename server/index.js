import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import keys from './config/keys';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(keys.URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("Successfully connected to Database"))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));



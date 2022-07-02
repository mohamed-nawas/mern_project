import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

import postsRouter from "./routes/postsRouter.js";

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postsRouter);

// https://www.mongodb.com/cloud/atlas

const DB_CONNECTION_CREDENTIALS = {
    "username": "mohamed-nawas",
    "password": "mohamed-nawas-95"
}
const CONNECTION_URL = "mongodb+srv://" + DB_CONNECTION_CREDENTIALS.username + ":" + DB_CONNECTION_CREDENTIALS.password + "@cluster0.lzfrh.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((e) => console.error(e));
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config.js';
import router from './routes/posts.route.js';
import dotenv from 'dotenv';


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/', router)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(config.port, () => console.log(`Server running on port: ${config.port}`))
    }).catch((err) => {
        console.log(err.message)
    })

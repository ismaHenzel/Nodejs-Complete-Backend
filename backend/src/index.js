import express from 'express';
import routes from './routes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config();
const app = express()

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

app.use(cors())
app.use(express.json());
app.use(routes)
app.listen(3333, ()=>{console.log("Server ON")})

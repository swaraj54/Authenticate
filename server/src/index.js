import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import allRoutes from './../routes/index.js'

const app = express();

app.use(express.json());
app.use(cors())
dotenv.config()

app.get('/healthcheck', (req, res) => {
    res.send("Working..")
})

app.use('/api/v1', allRoutes)

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to DB.")
})

app.listen(8000, () => { console.log("Listening on port 8000.") })
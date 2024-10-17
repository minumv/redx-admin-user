import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> console.log("Database connected"))
.catch((err)=> console.log(err))

const app = express();

app.use(express.json());

app.listen(3000,()=>{
    console.log(("Server listening on port 3000.."));
});

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
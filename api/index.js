import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.
connect(process.env.MONGO).
then(() => {
    console.log("Connected to mongodb");
}).catch((err) => {
    console.log(err);
});
const app = express();

app.listen(5000, () => {
    console.log('Listening on port 5000');
});
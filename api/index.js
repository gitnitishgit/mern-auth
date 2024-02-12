import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import exp from 'constants';
dotenv.config();

mongoose.
connect(process.env.MONGO).
then(() => {
    console.log("Connected to mongodb");
}).catch((err) => {
    console.log(err);
});
const app = express();

app.use(express.json());

app.listen(5000, () => {
    console.log('Listening on port 5000');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return response.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
});
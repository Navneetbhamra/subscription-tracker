import express from 'express';
import cookie from 'cookie-parser';

import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: 'false'}));
app.use(cookieParser());
app.use(arcjetMiddleware);

// api/v1/auth/sign-up

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);
app.use(errorMiddleware);


//this is a route

app.get('/', (req, res) =>{
    res.send("Welcome to the Subscription Tracking API")
});

app.listen(PORT, async () => {
    console.log(`Subscription tracker is running on http://localhost:${PORT}`)
    await connectToDatabase();
});


export default app;
import {Router} from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';


//api/v1/auth/sign-up -> POST body -> {name, email, password} -> creates a new user

const authRouter = Router();
//path -> api/vi/auth/sign-up (POST)
authRouter.post('/sign-up', signUp);

//path -> api/vi/auth/sign-in (POST)
authRouter.post('/sign-in', signIn);

//path -> api/vi/auth/sign-out (POST)
authRouter.post('/sign-out', signOut);

export default authRouter;
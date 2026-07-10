import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js"
import { getUser, getUsers } from "../controllers/user.controller.js";
import { signUp } from "../controllers/auth.controller.js";
import { updateUser, deleteUser } from "../controllers/user.controller.js";


const userRouter = Router();

// Get /users -> gets all users
// get /:id -> get specific users by id like -> 1123 8956 gets different user details

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', signUp);

userRouter.put('/:id', authorize, updateUser);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;
import express from "express";
import {
  postLogin,
  postSignUp,
  postUser,
} from "../controllers/user.controller";
import { isAuth } from "../middleware/is-auth";

const userRouter = express.Router();

userRouter.post("/signup", postSignUp);

userRouter.post("/login", postLogin);

userRouter.get("/user/:authorId", isAuth, postUser);

export default userRouter;

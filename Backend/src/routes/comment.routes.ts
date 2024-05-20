import express from "express";
import {
  editComment,
  getComment,
  postComment,
} from "../controllers/comment.controller";
import { isAuth } from "../middleware/is-auth";

const commentRouter = express.Router();

commentRouter.post("/comment/:blogId", isAuth, postComment);

commentRouter.get("/comment/:blogId", isAuth, getComment);

commentRouter.patch("/comment/:commentId", editComment);

export default commentRouter;

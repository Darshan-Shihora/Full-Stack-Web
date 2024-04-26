import express from "express";
import {
  deleteBlog,
  editBlog,
  getAllBlog,
  getBlog,
  postBlog,
} from "../controllers/blog.controller";
import { isAuth } from "../middleware/is-auth";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlog);

blogRouter.get("/blog/:blog_id", isAuth, getBlog);

blogRouter.post("/blog", isAuth, postBlog);

blogRouter.patch("/blog/:blog_id", isAuth, editBlog);

blogRouter.delete("/blog/:blog_id", isAuth, deleteBlog);

export default blogRouter;

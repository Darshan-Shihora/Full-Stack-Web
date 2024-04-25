import express from "express";
import {
  deleteBlog,
  editBlog,
  getAllBlog,
  getBlog,
  postBlog,
} from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlog);

blogRouter.get("/blog/:blog_id", getBlog);

blogRouter.post("/blog", postBlog);

blogRouter.patch("/blog/:blog_id", editBlog);

blogRouter.delete("/blog/:blog_id", deleteBlog)

export default blogRouter;

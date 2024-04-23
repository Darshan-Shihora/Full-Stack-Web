import express  from "express";
import { getAllBlog, postBlog } from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.get('/', getAllBlog);

blogRouter.post('/blog', postBlog)

export default blogRouter;
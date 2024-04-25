"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const blogRouter = express_1.default.Router();
blogRouter.get("/", blog_controller_1.getAllBlog);
blogRouter.get("/blog/:blog_id", blog_controller_1.getBlog);
blogRouter.post("/blog", blog_controller_1.postBlog);
blogRouter.patch("/blog/:blog_id", blog_controller_1.editBlog);
blogRouter.delete("/blog/:blog_id", blog_controller_1.deleteBlog);
exports.default = blogRouter;

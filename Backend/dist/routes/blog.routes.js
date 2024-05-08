"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const is_auth_1 = require("../middleware/is-auth");
const multer_1 = __importDefault(require("multer"));
const index_1 = require("../index");
const blogRouter = express_1.default.Router();
blogRouter.get("/", is_auth_1.isAuth, blog_controller_1.getAllBlog);
blogRouter.get("/blog/:blog_id", is_auth_1.isAuth, blog_controller_1.getBlog);
blogRouter.post("/blog", is_auth_1.isAuth, (0, multer_1.default)({ storage: index_1.storage }).single("image"), blog_controller_1.postBlog);
blogRouter.patch("/blog/:blog_id", is_auth_1.isAuth, blog_controller_1.editBlog);
blogRouter.delete("/blog/:blog_id", is_auth_1.isAuth, blog_controller_1.deleteBlog);
exports.default = blogRouter;
//# sourceMappingURL=blog.routes.js.map
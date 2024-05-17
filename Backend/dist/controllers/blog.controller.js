"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.editBlog = exports.postBlog = exports.getBlog = exports.getAllBlog = exports.getBlogs = void 0;
const blog_model_1 = require("../models/blog.model");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../models/index");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const sharp_1 = __importDefault(require("sharp"));
const getBlogs = (loginUserId, limit, offset, authorUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield index_1.sequelize.query(`select 
    blog.blog_id,
    blog.title,
    blog.image,
    blog.date,
    blog.description,
    u.user_id,
    u.name,
    count(l.user_id) as likes,
    CASE 
          WHEN EXISTS (
              SELECT 1 
              FROM likes l2 
              WHERE l2.blog_id = blog.blog_id 
                AND l2.user_id = :userId
          ) THEN 'false' 
          ELSE 'true' 
      END AS canBeLiked
  from
    blogs as blog
  left join users as u on
    blog.user_id = u.user_id
  left join likes l on
    l.blog_id = blog.blog_id
  ` +
        `${authorUserId ? `where blog.user_id = :authorUserId` : ``}` +
        `
    group by blog.blog_id 
  order by blog.updated_at DESC
  limit :limit offset :offset`, {
        replacements: { userId: loginUserId, offset, limit, authorUserId },
        type: sequelize_1.QueryTypes.SELECT,
        raw: true,
    });
    const blog = yield blog_model_1.Blog.findAll();
});
exports.getBlogs = getBlogs;
// GET ALL BLOGS
const getAllBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.userId;
    const offset = +req.query.offset;
    const limit = +req.query.limit;
    const blogs = yield index_1.sequelize.query(`select 
    blog.blog_id,
    blog.title,
    blog.image,
    blog.date,
    blog.description,
    u.user_id,
    u.name,
    count(l.user_id) as likes,
    CASE 
          WHEN EXISTS (
              SELECT 1 
              FROM likes l2 
              WHERE l2.blog_id = blog.blog_id 
                AND l2.user_id = :userId
          ) THEN 'false' 
          ELSE 'true' 
      END AS canBeLiked
  from
    blogs as blog
  left join users as u on
    blog.user_id = u.user_id
  left join likes l on
    l.blog_id = blog.blog_id
    group by blog.blog_id 
  order by blog.updated_at DESC
  limit :limit offset :offset`, {
        replacements: { userId, offset, limit },
        type: sequelize_1.QueryTypes.SELECT,
        raw: true,
    });
    const blogCount = yield blog_model_1.Blog.count();
    if (blogs && blogs.length > 0) {
        res.status(http_status_codes_1.StatusCodes.OK).send({
            message: "Blog found Successfully",
            data: blogs,
            length: blogCount,
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
            data: null,
            message: "No Data available",
            status: "Success",
        });
    }
});
exports.getAllBlog = getAllBlog;
// GET SINGLE BLOG
const getBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.blog_id;
    const userId = +req.userId;
    const blog = yield index_1.sequelize.query(`
    select 
    blog.blog_id,
    blog.title,
    blog.image,
    blog.date,
    blog.description,
    u.user_id,
    u.name,
    count(l.user_id) as likes,
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM likes l2 
            WHERE l2.blog_id = blog.blog_id 
            AND l2.user_id = :userId
      ) THEN 'false' 
      ELSE 'true' 
    END AS canBeLiked
  from
    blogs as blog
  left join users as u on
    blog.user_id = u.user_id
  left join likes l on
    l.blog_id = blog.blog_id
    where blog.blog_id = :blogId
    group by blog.blog_id;
  `, {
        replacements: { blogId: id, userId },
        type: sequelize_1.QueryTypes.SELECT,
        raw: true,
    });
    if (blog) {
        res.status(http_status_codes_1.StatusCodes.OK).send({
            message: "Blog found successfully",
            data: blog,
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
            message: "No blog found",
            data: null,
        });
    }
});
exports.getBlog = getBlog;
// ADD NEW BLOG
function formatDate(dateString) {
    return (0, moment_1.default)(dateString).format("YYYY-MM-DD");
}
const postBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, description } = req.body;
    const formattedDate = formatDate(date);
    const image = req.file;
    console.log(image);
    // const imageUrl = image.buffer;
    const imageUrl = yield (0, sharp_1.default)(image.buffer).resize(1000).rotate().toBuffer();
    console.log(imageUrl);
    const imageName = Date.now() + "-" + image.originalname;
    const existingBlog = yield blog_model_1.Blog.findOne({ where: { title: title } });
    if (!existingBlog) {
        const blog = yield blog_model_1.Blog.create({
            title: title,
            image: imageUrl,
            date: formattedDate,
            imageName: imageName,
            description: description,
            user_id: +req.userId,
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).send({
            message: "Blog successfully created",
            data: blog,
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).send({
            message: "Blog already exist",
            data: null,
        });
    }
});
exports.postBlog = postBlog;
// EDIT BLOG
const editBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date } = req.body;
    const formattedDate = formatDate(date);
    const image = req.file;
    console.log(req.file);
    const id = req.params.blog_id;
    const imageUrl = yield (0, sharp_1.default)(image.buffer).resize(1000).rotate().toBuffer();
    const imageName = Date.now() + "-" + image.originalname;
    const editBlog = yield blog_model_1.Blog.findOne({ where: { blog_id: id } });
    console.log(editBlog);
    if (editBlog) {
        editBlog.title = title;
        editBlog.description = description;
        editBlog.date = formattedDate;
        editBlog.image = imageUrl;
        editBlog.imageName = imageName;
        yield editBlog.save();
        res.status(http_status_codes_1.StatusCodes.OK).send({
            message: "Blog edited Successfully",
            data: editBlog,
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            message: "Blog can't be edit",
            data: null,
        });
    }
});
exports.editBlog = editBlog;
// DELETE BLOG
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.blog_id;
    console.log(id);
    const blog = yield blog_model_1.Blog.findOne({ where: { blog_id: id } });
    console.log(blog);
    if (blog) {
        res.status(http_status_codes_1.StatusCodes.OK).send({
            message: "Blog deleted successfully",
            data: blog,
        });
        yield blog.destroy();
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            message: "Blog can't be delete",
            data: null,
        });
    }
});
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=blog.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.editBlog = exports.postBlog = exports.getBlog = exports.getAllBlog = void 0;
const blog_model_1 = require("../models/blog.model");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../models/index");
const sequelize_1 = require("sequelize");
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
  order by blog.updatedAt DESC
  limit :limit offset :offset`, {
        replacements: { userId, offset, limit },
        type: sequelize_1.QueryTypes.SELECT,
        raw: true,
    });
    const blog = yield blog_model_1.Blog.findAll();
    if (blogs && blogs.length > 0) {
        res.status(http_status_codes_1.StatusCodes.OK).send({
            message: "Blog found Successfully",
            data: blogs,
            length: blog.length,
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
const postBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, description } = req.body;
    console.log(req);
    const image = req.file;
    // image = {
    //   fieldname: 'image',
    //   originalname: 'most popular type of cms.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg',
    //   destination: 'src/images',
    //   filename: 'most popular type of cms.jpg-185352207',
    //   path: 'src\\images\\most popular type of cms.jpg-1715073052086-185352207',
    //   size: 53986
    // }
    // const imageUrl = image.path.split("\\")[2];
    const imageUrl = image.originalname;
    console.log(imageUrl);
    // const originalName = image.originalname.split(".");
    // const suffix = image.filename.split("-")[1];
    // originalName.splice(1, 0, "-", suffix, ".");
    // const imageUrl = originalName.join("");
    // console.log(imageUrl);
    const existingBlog = yield blog_model_1.Blog.findOne({ where: { title: title } });
    if (!existingBlog) {
        const blog = yield blog_model_1.Blog.create({
            title: title,
            image: imageUrl,
            date: date,
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
    const image = req.file;
    const id = req.params.blog_id;
    const imageUrl = image.filename;
    const editBlog = yield blog_model_1.Blog.findOne({ where: { blog_id: id } });
    console.log(editBlog);
    if (editBlog) {
        editBlog.title = title;
        editBlog.description = description;
        editBlog.date = date;
        editBlog.image = imageUrl;
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
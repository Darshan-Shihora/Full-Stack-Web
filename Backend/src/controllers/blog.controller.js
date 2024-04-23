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
exports.postBlog = exports.getAllBlog = void 0;
const blog_model_1 = require("../models/blog.model");
const http_status_codes_1 = require("http-status-codes");
const getAllBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_model_1.Blog.findAll();
    console.log(blogs);
    if (blogs && blogs.length > 0) {
        res.status(http_status_codes_1.StatusCodes.OK).send({
            message: "Blog found Successfully",
            data: blogs,
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
const postBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, title, date, description } = req.body;
    const existingBlog = yield blog_model_1.Blog.findOne({ where: { title: title } });
    if (!existingBlog) {
        const blog = yield blog_model_1.Blog.create({
            title: title,
            image: image,
            date: date,
            description: description,
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

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
exports.getLike = exports.postLike = void 0;
const likes_model_1 = require("../models/likes.model");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../models/index");
const sequelize_1 = require("sequelize");
const postLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const existingLike = yield likes_model_1.Like.findOne({
        where: { blogId: blogId, userId: req.userId },
    });
    try {
        if (existingLike) {
            res.send({
                message: "User Unliked the blog",
            });
            yield existingLike.destroy();
        }
        else {
            const response = yield likes_model_1.Like.create({
                userId: +req.userId,
                blogId: +blogId,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).send({
                message: "User Liked the blog",
                data: response,
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            message: "Bad Request",
            error: error,
        });
    }
});
exports.postLike = postLike;
const getLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const response = yield index_1.sequelize.query(`select
    blog.blog_id,
    u.user_id,
    u.name,
    count(l.user_id) as likes,
    CASE
          WHEN EXISTS (
              SELECT 1
              FROM likes l2
              WHERE l2.blog_id = blog.blog_id
                AND l2.user_id = ${req.userId}
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
    group by blog.blog_id;`, {
        replacements: { blogId },
        type: sequelize_1.QueryTypes.SELECT,
        raw: true,
    });
    res.send({
        message: "Liked a particular blog",
        data: response,
    });
});
exports.getLike = getLike;
//# sourceMappingURL=like.controller.js.map
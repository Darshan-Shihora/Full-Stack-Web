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
exports.getComment = exports.postComment = void 0;
const comment_model_1 = require("../models/comment.model");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../models/index");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const postComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { comment } = req.body;
    const userId = +req.userId;
    const newComment = yield comment_model_1.Comment.create({
        user_id: userId,
        blog_id: +blogId,
        comment,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).send({
        message: "New comment added",
        data: newComment,
    });
});
exports.postComment = postComment;
const getComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const comment = yield index_1.sequelize.query(`
    select
    c.comment_id,
    u.name,
    comment,
    c.created_at 
  from
    comments c
  left join users u on
    c.user_id = u.user_id
  where
    c.blog_id = :blogId
    order by c.created_at desc; 
  `, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { blogId },
        raw: true,
    });
    comment.map((com) => {
        const formattedDate = (0, moment_1.default)(com.created_at)
            .utcOffset("+00:00")
            .format("DD MMM YYYY hh:mm A");
        com.created_at = formattedDate;
    });
    const commentsCount = yield comment_model_1.Comment.count({
        where: {
            blog_id: blogId,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).send({
        message: "Successfully fetch the comments",
        data: comment,
        count: commentsCount,
    });
});
exports.getComment = getComment;
//# sourceMappingURL=comment.controller.js.map
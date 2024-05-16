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
exports.postComment = void 0;
const comment_model_1 = require("../models/comment.model");
const http_status_codes_1 = require("http-status-codes");
const postComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { comment } = req.body;
    const userId = +req.userId;
    console.log(blogId, comment, userId);
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
//# sourceMappingURL=comment.controller.js.map
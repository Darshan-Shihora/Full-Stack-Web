import { NextFunction, Request, Response } from "express";
import { Comment } from "../models/comment.model";
import { StatusCodes } from "http-status-codes";

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  const userId = +req.userId;
  console.log(blogId, comment, userId);

  const newComment = await Comment.create({
    user_id: userId,
    blog_id: +blogId,
    comment,
  });
  res.status(StatusCodes.CREATED).send({
    message: "New comment added",
    data: newComment,
  });
};

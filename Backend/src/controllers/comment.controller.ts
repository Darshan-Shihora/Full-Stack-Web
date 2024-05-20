import { NextFunction, Request, Response } from "express";
import { Comment } from "../models/comment.model";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../models/index";
import { QueryTypes } from "sequelize";
import moment from "moment";

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  const userId = +req.userId;

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

type comment = {
  name: string;
  comment: string;
  created_at: string;
  updated_at: string;
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const comment: comment[] = await sequelize.query(
    `
    select
    c.comment_id,
    u.name,
    comment,
    c.created_at,
    c.updated_at 
  from
    comments c
  left join users u on
    c.user_id = u.user_id
  where
    c.blog_id = :blogId
    order by c.created_at desc; 
  `,
    {
      type: QueryTypes.SELECT,
      replacements: { blogId },
      raw: true,
    }
  );

  comment.map((com) => {
    const createdFormattedDate = moment(com.created_at)
      .utcOffset("+00:00")
      .format("DD MMM YYYY hh:mm A");
    com.created_at = createdFormattedDate;

    const updatedFormattedDate = moment(com.updated_at)
      .utcOffset("+00:00")
      .format("DD MMM YYYY hh:mm A");
    com.updated_at = updatedFormattedDate;
  });

  const commentsCount = await Comment.count({
    where: {
      blog_id: blogId,
    },
  });
  res.status(StatusCodes.OK).send({
    message: "Successfully fetch the comments",
    data: comment,
    count: commentsCount,
  });
};

export const editComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comment } = req.body;
  const { commentId } = req.params;

  const editingComment: any = await Comment.findOne({
    where: { comment_id: commentId },
  });

  if (editingComment) {
    editingComment.comment = comment;
    await editingComment.save();
    res.status(StatusCodes.OK).send({
      message: "Edited the comment",
      data: editingComment,
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Comment can't be edit",
      data: null,
    });
  }
};

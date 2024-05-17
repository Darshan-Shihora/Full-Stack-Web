import { NextFunction, Request, Response } from "express";
import { Comment } from "../models/comment.model";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../models/index";
import { QueryTypes } from "sequelize";

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

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const comment = await sequelize.query(
    `
    select
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
  `,
    {
      type: QueryTypes.SELECT,
      replacements: { blogId },
      raw: true,
    }
  );
  res.status(StatusCodes.OK).send({
    message: "Successfully fetch the comments",
    data: comment,
  });
};

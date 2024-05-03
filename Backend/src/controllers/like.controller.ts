import { Request, Response, NextFunction } from "express";
import { Like } from "../models/likes.model";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../models/index";
import { QueryTypes } from "sequelize";

export const postLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.blogId;
  const existingLike: any = await Like.findOne({
    where: { blogId: blogId, userId: req.userId },
  });
  try {
    if (existingLike) {
      res.send({
        message: "User Unliked the blog",
        // data: response,
      });
      await existingLike.destroy();
    } else {
      const response = await Like.create({
        userId: +req.userId!,
        blogId: +blogId,
      });
      res.status(StatusCodes.CREATED).send({
        message: "User Liked the blog",
        data: response,
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Bad Request",
      error: error,
    });
  }
};

export const getLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.blogId;
  const response = await sequelize.query(
    `select
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
    group by blog.blog_id;`,
    {
      replacements: { blogId },
      type: QueryTypes.SELECT,
      raw: true,
    }
  );
  // console.log(response);

  res.send({
    message: "Liked a particular blog",
    data: response,
  });
};

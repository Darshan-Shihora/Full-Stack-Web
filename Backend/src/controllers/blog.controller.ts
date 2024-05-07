import { NextFunction, Request, Response } from "express";
import { Blog } from "../models/blog.model";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../models/index";
import { QueryTypes } from "sequelize";

// GET ALL BLOGS
export const getAllBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = +req.userId;
  // const userIdParam = userId === undefined ? null : `'${userId}'`;
  const offset = +req.query.offset;
  const limit = +req.query.limit;
  const blogs = await sequelize.query(
    `select 
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
  limit :limit offset :offset`,
    {
      replacements: { userId, offset, limit },
      type: QueryTypes.SELECT,
      raw: true,
    }
  );
  const blog = await Blog.findAll();
  if (blogs && blogs.length > 0) {
    res.status(StatusCodes.OK).send({
      message: "Blog found Successfully",
      data: blogs,
      length: blog.length,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).send({
      data: null,
      message: "No Data available",
      status: "Success",
    });
  }
};

// GET SINGLE BLOG
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.blog_id;
  const userId = +req.userId;
  // const blog = await Blog.findOne({ where: { blog_id: id } });
  const blog = await sequelize.query(
    `
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
  `,
    {
      replacements: { blogId: id, userId },
      type: QueryTypes.SELECT,
      raw: true,
    }
  );
  if (blog) {
    res.status(StatusCodes.OK).send({
      message: "Blog found successfully",
      data: blog,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).send({
      message: "No blog found",
      data: null,
    });
  }
};

// ADD NEW BLOG
export const postBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, date, description } = req.body;
  const image = req.file;
  const existingBlog = await Blog.findOne({ where: { title: title } });
  if (!existingBlog) {
    const blog = await Blog.create({
      title: title,
      image: image,
      date: date,
      description: description,
      user_id: +req.userId!,
    });
    res.status(StatusCodes.CREATED).send({
      message: "Blog successfully created",
      data: blog,
    });
  } else {
    res.status(StatusCodes.CONFLICT).send({
      message: "Blog already exist",
      data: null,
    });
  }
};

// EDIT BLOG
export const editBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, date, image } = req.body;
  const id = req.params.blog_id;
  const editBlog: any = await Blog.findOne({ where: { blog_id: id } });
  console.log(editBlog);
  if (editBlog) {
    editBlog.title = title;
    editBlog.description = description;
    editBlog.date = date;
    editBlog.image = image;
    await editBlog.save();

    res.status(StatusCodes.OK).send({
      message: "Blog edited Successfully",
      data: editBlog,
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Blog can't be edit",
      data: null,
    });
  }
};

// DELETE BLOG
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.blog_id;
  console.log(id);

  const blog = await Blog.findOne({ where: { blog_id: id } });
  console.log(blog);

  if (blog) {
    res.status(StatusCodes.OK).send({
      message: "Blog deleted successfully",
      data: blog,
    });
    await blog.destroy();
  } else {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Blog can't be delete",
      data: null,
    });
  }
};

import { NextFunction, Request, Response } from "express";
import { Blog, BlogType } from "../models/blog.model";
import { StatusCodes } from "http-status-codes";

// GET ALL BLOGS
export const getAllBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogs = await Blog.findAll();
  console.log(blogs);
  if (blogs && blogs.length > 0) {
    res.status(StatusCodes.OK).send({
      message: "Blog found Successfully",
      data: blogs,
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
  const blog = await Blog.findOne({ where: { blog_id: id } });
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
  const { image, title, date, description } = req.body;
  const existingBlog = await Blog.findOne({ where: { title: title } });
  if (!existingBlog) {
    const blog = await Blog.create({
      title: title,
      image: image,
      date: date,
      description: description,
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
    editBlog.save();

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
    blog.destroy();
  } else {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Blog can't be delete",
      data: null,
    });
  }
};

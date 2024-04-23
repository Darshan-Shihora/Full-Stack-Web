import { NextFunction, Request, Response } from "express";
import { Blog } from "../models/blog.model";
import { StatusCodes } from "http-status-codes";

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

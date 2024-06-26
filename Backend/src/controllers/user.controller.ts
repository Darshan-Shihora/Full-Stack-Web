import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sequelize } from "../models/index";
import { QueryTypes } from "sequelize";

export const postSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    res.status(StatusCodes.OK).send({
      message: "User already exist",
      data: existingUser,
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(StatusCodes.CREATED).send({
      message: "User created Successfully",
      data: user,
    });
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const checkUser: any = await User.findOne({ where: { email: email } });
  if (!checkUser) {
    res.status(StatusCodes.FORBIDDEN).send({
      message: "No User exist! Please Sign up first",
      data: null,
    });
  } else {
    const decodePassword = await bcrypt.compare(password, checkUser.password);
    if (decodePassword) {
      const token = jwt.sign(
        {
          userName: checkUser.name,
          userId: checkUser.user_id,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "24h" }
      );
      res.setHeader("Authorization", token);
      res.status(StatusCodes.ACCEPTED).send({
        message: "User successfully loggedIn",
        data: {
          name: checkUser.name,
          email: checkUser.email,
          token: token,
        },
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "Incorrect Credentials",
        data: null,
      });
    }
  }
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorId } = req.params;
  const userId = +req.userId || 0;
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
    where blog.user_id = :authorId
    group by blog.blog_id 
  order by blog.updated_at DESC`,
    {
      replacements: { userId, authorId },
      type: QueryTypes.SELECT,
      raw: true,
    }
  );
  res.status(StatusCodes.OK).send({
    message: "Get blogs for particular user",
    data: blogs,
  });
};

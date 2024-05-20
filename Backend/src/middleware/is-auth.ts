import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import "dotenv/config";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("Authorization")?.split(" ")[1];
  let decodedToken;
  // if (!token) {
  //   res.status(StatusCodes.UNAUTHORIZED).send({
  //     message: "Token is not set",
  //   });
  // }
  try {
    decodedToken = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    ) as jwt.JwtPayload;
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    req.userId = "0";
    next();
    // res.status(StatusCodes.UNAUTHORIZED).send({
    //   message: "Invalid Token",
    // });
  }
};

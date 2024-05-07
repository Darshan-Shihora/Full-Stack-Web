import { User } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const postSignUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
        res.status(StatusCodes.OK).send({
            message: "User already exist",
            data: existingUser,
        });
    }
    else {
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
export const postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ where: { email: email } });
    if (!checkUser) {
        res.status(StatusCodes.FORBIDDEN).send({
            message: "No User exist! Please Sign up first",
            data: null,
        });
    }
    else {
        const decodePassword = await bcrypt.compare(password, checkUser.password);
        if (decodePassword) {
            const token = jwt.sign({
                userName: checkUser.name,
                userId: checkUser.user_id,
            }, process.env.SECRET_KEY, { expiresIn: "24h" });
            res.setHeader("Authorization", token);
            res.status(StatusCodes.ACCEPTED).send({
                message: "User successfully loggedIn",
                data: {
                    name: checkUser.name,
                    email: checkUser.email,
                    token: token,
                },
            });
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: "Incorrect Credentials",
                data: null,
            });
        }
    }
};
//# sourceMappingURL=user.controller.js.map
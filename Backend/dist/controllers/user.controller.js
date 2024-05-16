"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = exports.postLogin = exports.postSignUp = void 0;
const user_model_1 = require("../models/user.model");
const http_status_codes_1 = require("http-status-codes");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const index_1 = require("../models/index");
const sequelize_1 = require("sequelize");
const postSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingUser = yield user_model_1.User.findOne({ where: { email: email } });
    if (existingUser) {
        res.status(http_status_codes_1.StatusCodes.OK).send({
            message: "User already exist",
            data: existingUser,
        });
    }
    else {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = yield user_model_1.User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).send({
            message: "User created Successfully",
            data: user,
        });
    }
});
exports.postSignUp = postSignUp;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const checkUser = yield user_model_1.User.findOne({ where: { email: email } });
    if (!checkUser) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send({
            message: "No User exist! Please Sign up first",
            data: null,
        });
    }
    else {
        const decodePassword = yield bcryptjs_1.default.compare(password, checkUser.password);
        if (decodePassword) {
            const token = jsonwebtoken_1.default.sign({
                userName: checkUser.name,
                userId: checkUser.user_id,
            }, process.env.SECRET_KEY, { expiresIn: "24h" });
            res.setHeader("Authorization", token);
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).send({
                message: "User successfully loggedIn",
                data: {
                    name: checkUser.name,
                    email: checkUser.email,
                    token: token,
                },
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                message: "Incorrect Credentials",
                data: null,
            });
        }
    }
});
exports.postLogin = postLogin;
const postUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId } = req.params;
    const userId = +req.userId || 0;
    const blogs = yield index_1.sequelize.query(`select 
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
  order by blog.updated_at DESC`, {
        replacements: { userId, authorId },
        type: sequelize_1.QueryTypes.SELECT,
        raw: true,
    });
    res.status(http_status_codes_1.StatusCodes.OK).send({
        message: "Get blogs for particular user",
        data: blogs,
    });
});
exports.postUser = postUser;
//# sourceMappingURL=user.controller.js.map
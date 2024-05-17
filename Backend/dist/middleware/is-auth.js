"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const isAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    let decodedToken;
    // if (!token) {
    //   res.status(StatusCodes.UNAUTHORIZED).send({
    //     message: "Token is not set",
    //   });
    // }
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        console.log(error);
        req.userId = "0";
        next();
        // res.status(StatusCodes.UNAUTHORIZED).send({
        //   message: "Invalid Token",
        // });
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=is-auth.js.map
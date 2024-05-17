"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const is_auth_1 = require("../middleware/is-auth");
const userRouter = express_1.default.Router();
userRouter.post("/signup", user_controller_1.postSignUp);
userRouter.post("/login", user_controller_1.postLogin);
userRouter.get("/user/:authorId", is_auth_1.isAuth, user_controller_1.postUser);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map
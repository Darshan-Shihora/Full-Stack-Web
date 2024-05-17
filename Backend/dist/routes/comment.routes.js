"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const is_auth_1 = require("../middleware/is-auth");
const commentRouter = express_1.default.Router();
commentRouter.post('/comment/:blogId', is_auth_1.isAuth, comment_controller_1.postComment);
commentRouter.get('/comment/:blogId', is_auth_1.isAuth, comment_controller_1.getComment);
exports.default = commentRouter;
//# sourceMappingURL=comment.routes.js.map
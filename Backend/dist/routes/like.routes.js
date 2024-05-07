"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("../controllers/like.controller");
const is_auth_1 = require("../middleware/is-auth");
const router = express_1.default.Router();
router.get("/like/:blogId", is_auth_1.isAuth, like_controller_1.getLike);
router.post("/like/:blogId", is_auth_1.isAuth, like_controller_1.postLike);
exports.default = router;
//# sourceMappingURL=like.routes.js.map
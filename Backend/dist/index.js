"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const user_model_1 = require("./models/user.model");
const blog_model_1 = require("./models/blog.model");
const likes_model_1 = require("./models/likes.model");
const comment_model_1 = require("./models/comment.model");
const app = (0, express_1.default)();
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "dist/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const allowedDomains = (_a = process.env.CORS_ALLOWED_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(",");
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if ((allowedDomains === null || allowedDomains === void 0 ? void 0 : allowedDomains.indexOf(origin)) === -1) {
            const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(user_routes_1.default);
app.use(blog_routes_1.default);
app.use(like_routes_1.default);
app.use(comment_routes_1.default);
user_model_1.User.hasMany(blog_model_1.Blog, {
    foreignKey: "user_id",
    as: "blog",
});
blog_model_1.Blog.belongsTo(user_model_1.User, {
    foreignKey: "user_id",
    as: "user",
});
user_model_1.User.hasMany(likes_model_1.Like, {
    foreignKey: "user_id",
    as: "like",
});
likes_model_1.Like.belongsTo(user_model_1.User, {
    foreignKey: "user_id",
    as: "user",
});
blog_model_1.Blog.hasMany(likes_model_1.Like, {
    foreignKey: "blog_id",
    as: "like",
});
likes_model_1.Like.belongsTo(blog_model_1.Blog, {
    foreignKey: "blog_id",
    as: "blog",
});
user_model_1.User.hasMany(comment_model_1.Comment, {
    foreignKey: "user_id",
    as: "comment",
});
comment_model_1.Comment.belongsTo(user_model_1.User, {
    foreignKey: "user_id",
    as: "user",
});
blog_model_1.Blog.hasMany(comment_model_1.Comment, {
    foreignKey: "blog_id",
    as: "comment",
});
comment_model_1.Comment.belongsTo(blog_model_1.Blog, {
    foreignKey: "blog_id",
    as: "blog",
});
app.listen(process.env.DB_PORT, () => {
    console.log(`Port started listning ${process.env.DB_PORT}`);
});
//# sourceMappingURL=index.js.map
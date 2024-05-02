"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const user_model_1 = require("./user.model");
const blog_model_1 = require("./blog.model");
exports.Like = index_1.sequelize.define("like", {
    likeId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_model_1.User,
            key: "user_id",
        },
    },
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: blog_model_1.Blog,
            key: "blog_id",
        },
    },
}, {
    underscored: true,
});
//# sourceMappingURL=likes.model.js.map
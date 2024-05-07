"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../models/index");
const user_model_1 = require("./user.model");
exports.Blog = index_1.sequelize.define("blog", {
    blog_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.BLOB,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_model_1.User,
            key: "user_id",
        },
    },
});
//# sourceMappingURL=blog.model.js.map
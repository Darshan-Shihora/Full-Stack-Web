import { DataTypes } from "sequelize";
import { sequelize } from "../models/index";
import { User } from "./user.model";
export const Blog = sequelize.define("blog", {
    blog_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "user_id",
        },
    },
});
//# sourceMappingURL=blog.model.js.map
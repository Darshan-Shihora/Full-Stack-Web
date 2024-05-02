import { DataTypes } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user.model";
import { Blog } from "./blog.model";

export const Like = sequelize.define(
  "like",
  {
    likeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      references: {
        model: Blog,
        key: "blog_id",
      },
    },
  },
  {
    underscored: true,
  }
);

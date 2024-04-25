import { DataTypes } from "sequelize";
import { sequelize } from "../models/index";

export type BlogType = {
  blog_id: number,
  image: string,
  title: string,
  date: Date,
  description: string,
}

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
});

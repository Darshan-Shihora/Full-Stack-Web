import express from "express";
import "dotenv/config";
import cors from "cors";
import multer from "multer";
import blogRouter from "./routes/blog.routes";
import userRouter from "./routes/user.routes";
import likeRouter from "./routes/like.routes";
import { User } from "./models/user.model";
import { Blog } from "./models/blog.model";
import { Like } from "./models/likes.model";
import path from "path";
// import { fileURLToPath } from "url";

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const allowedDomains = process.env.CORS_ALLOWED_ORIGIN?.split(",");
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);
    if (allowedDomains?.indexOf(origin) === -1) {
      const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(multer({ storage: storage }).single("image"));
app.use(express.static(path.join(__dirname, "src/images")));
app.use(userRouter);
app.use(blogRouter);
app.use(likeRouter);

User.hasMany(Blog, {
  foreignKey: "user_id",
  as: "blog",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Like, {
  foreignKey: "user_id",
  as: "like",
});

Like.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Blog.hasMany(Like, {
  foreignKey: "blog_id",
  as: "like",
});

Like.belongsTo(Blog, {
  foreignKey: "blog_id",
  as: "blog",
});

app.listen(process.env.DB_PORT, () => {
  console.log(`Port started listning ${process.env.DB_PORT}`);
});

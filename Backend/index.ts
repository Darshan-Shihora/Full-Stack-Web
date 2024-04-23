import express from "express";
import "dotenv/config";
import cors from "cors";
import blogRouter from "./src/routes/blog.routes";

const app = express();

// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     console.log(origin);
//     console.log(SERVER.CORS_ALLOWED_ORIGIN?.split(",").indexOf(origin));
//     if (SERVER.CORS_ALLOWED_ORIGIN?.split(",").indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       console.log(`Error due to not allowed by CORS`);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

const corsOptions = "http://localhost:3001";

app.use(cors(corsOptions));
app.use(express.json());
app.use(blogRouter)
app.listen(process.env.DB_PORT, () => {
  console.log(`Port started listning ${process.env.DB_PORT}`);
});

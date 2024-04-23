"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const blog_routes_1 = __importDefault(require("./src/routes/blog.routes"));
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(blog_routes_1.default);
app.listen(process.env.DB_PORT, () => {
    console.log(`Port started listning ${process.env.DB_PORT}`);
});

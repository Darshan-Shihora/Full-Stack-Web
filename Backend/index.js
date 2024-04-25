"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const blog_routes_1 = __importDefault(require("./src/routes/blog.routes"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const app = (0, express_1.default)();
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
app.use(user_routes_1.default);
app.use(blog_routes_1.default);
app.listen(process.env.DB_PORT, () => {
    console.log(`Port started listning ${process.env.DB_PORT}`);
});

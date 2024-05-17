"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    logging: false,
});
exports.sequelize = sequelize;
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync();
        console.log("=> Created a new connection.");
    }
    catch (error) {
        console.error("=> Error syncing table:", error);
    }
});
dbConnection();
//# sourceMappingURL=index.js.map
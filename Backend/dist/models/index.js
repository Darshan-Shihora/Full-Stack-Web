import { Sequelize } from "sequelize";
import "dotenv/config";
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST,
});
export { sequelize };
const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("=> Created a new connection.");
    }
    catch (error) {
        console.error("=> Error syncing table:", error);
    }
};
dbConnection();
//# sourceMappingURL=index.js.map
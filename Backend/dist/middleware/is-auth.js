import jwt from "jsonwebtoken";
import "dotenv/config";
export const isAuth = (req, res, next) => {
    const token = req.get("Authorization")?.split(" ")[1];
    let decodedToken;
    // if (!token) {
    //   res.status(StatusCodes.UNAUTHORIZED).send({
    //     message: "Token is not set",
    //   });
    // }
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken.userId;
        console.log(req.userId);
        next();
    }
    catch (error) {
        console.log(error);
        req.userId = "0";
        next();
        // res.status(StatusCodes.UNAUTHORIZED).send({
        //   message: "Invalid Token",
        // });
    }
};
//# sourceMappingURL=is-auth.js.map
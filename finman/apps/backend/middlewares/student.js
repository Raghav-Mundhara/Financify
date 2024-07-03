import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const studentMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const result = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = result.id;
            console.log("Passed Student Middleware check!");
            next();
        } catch (err) {
            return res.status(401).json({ msg: "Invalid token", err });
        }
    } else {
        return res.status(401).json({ msg: "Unauthorized Access" });
    }
};

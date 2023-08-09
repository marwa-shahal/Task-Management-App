"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Token Unavailable" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("d", req);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: "Token is invalid", error: error.message });
    }
};
exports.default = verifyToken;
// import jwt, { VerifyCallback } from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express"; // You need to import 'express' and its types here
// import UserModel from "./../models/userModel"; // Assuming 'User' is a TypeScript module
// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   if (
//     req.headers &&
//     req.headers.authorization &&
//     req.headers.authorization.split(" ")[0] === "JWT"
//   ) {
//     jwt.verify(
//       req.headers.authorization.split(" ")[1],
//       process.env.JWT_SECRET as string, // Assuming process.env.API_SECRET is of type string
//       function (err: any, decode: any) {
//         console.log(req)
//         if (err) req.user = undefined;
//         UserModel.findOne({
//           _id: decode.id,
//         }).exec((err: any, user: any) => {
//           if (err) {
//             res.status(500).send({
//               message: err,
//             });
//           } else {
//             req.user = user;
//             next();
//           }
//         });
//       }
//     );
//   } else {
//     req.user = undefined;
//     next();
//   }
// };
// export default verifyToken;

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the existing Request type to include the user property
interface AuthenticatedRequest extends Request {
  user: { id: string };
}

const verifyToken = (req:Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Token Unavailable" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    console.log("d", req);
    
    req.user = decoded;

    next();
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "Token is invalid", error: error.message });
  }
};

export default verifyToken;
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

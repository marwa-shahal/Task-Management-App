import { Request, Response } from "express";
import UserModel from "./../models/userModel";
import { IUser } from "../types/user";
import generateToken from "./../utils/generateToken";

/**
 * Get all users.
 *
 * @route GET /api/auth
 * @method GET
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}).select("-password");
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Register a new user.
 *
 * @route POST /api/auth/register
 * @method POST
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
export const register = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;
  const user = new UserModel({
    name,
    email,
    password,
  });
  await user.save();
  console.log(user);
  res.status(201).json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    },
  });
};

/**
 * Login a user.
 *
 * @route POST /api/auth/login
 * @method POST
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({ success: false, message: "User not found" });
    return;
  }

  if (await user.comparePassword(password)) {
    const token = generateToken(user._id);

    // Set the token in the Authorization header
    res.setHeader("Authorization", `Bearer ${token}`);
    
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Email or password incorrect" });
  }
};

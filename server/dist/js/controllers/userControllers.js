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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.getAll = void 0;
const userModel_1 = __importDefault(require("./../models/userModel"));
const generateToken_1 = __importDefault(require("./../utils/generateToken"));
/**
 * Get all users.
 *
 * @route GET /api/auth
 * @method GET
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({}).select("-password");
        res.status(200).json({ success: true, count: users.length, users });
    }
    catch (error) {
        // Handle the error here
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getAll = getAll;
/**
 * Register a new user.
 *
 * @route POST /api/auth/register
 * @method POST
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = new userModel_1.default({
        name,
        email,
        password,
    });
    yield user.save();
    console.log(user);
    res.status(201).json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            token: (0, generateToken_1.default)(user._id),
        },
    });
});
exports.register = register;
/**
 * Login a user.
 *
 * @route POST /api/auth/login
 * @method POST
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {void}
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email }).select("+password");
    if (!user) {
        res.status(401).json({ success: false, message: "User not found" });
        return;
    }
    if (yield user.comparePassword(password)) {
        const token = (0, generateToken_1.default)(user._id);
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
    }
    else {
        res
            .status(401)
            .json({ success: false, message: "Email or password incorrect" });
    }
});
exports.login = login;

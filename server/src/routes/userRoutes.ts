import express from "express";
import { login, register, getAll } from "./../controllers/userControllers";

const router = express.Router();

router.get("/", getAll);

router.post("/register", register);

router.post("/login", login);

export default router;

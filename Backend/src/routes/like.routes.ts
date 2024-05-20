import express from "express";
import { postLike } from "../controllers/like.controller";
import { isAuth } from "../middleware/is-auth";

const router = express.Router();

router.post("/like/:blogId", isAuth, postLike);

export default router;

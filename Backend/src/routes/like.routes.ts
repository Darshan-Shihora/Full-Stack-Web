import express from "express";
import { getLike, postLike } from "../controllers/like.controller";
import { isAuth } from "../middleware/is-auth";

const router = express.Router();

// router.get('/like',isAuth, getLikes)
router.get("/like/:blogId", isAuth, getLike);
router.post("/like/:blogId", isAuth, postLike);

export default router;

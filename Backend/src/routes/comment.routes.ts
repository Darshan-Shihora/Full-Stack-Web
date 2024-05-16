import express from 'express'
import { postComment } from '../controllers/comment.controller'
import { isAuth } from '../middleware/is-auth'

const commentRouter = express.Router()

commentRouter.post('/comment/:blogId',isAuth, postComment)

export default commentRouter
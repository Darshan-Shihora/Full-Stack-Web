import express from 'express'
import { getComment, postComment } from '../controllers/comment.controller'
import { isAuth } from '../middleware/is-auth'

const commentRouter = express.Router()

commentRouter.post('/comment/:blogId',isAuth, postComment)

commentRouter.get('/comment/:blogId', getComment)

export default commentRouter
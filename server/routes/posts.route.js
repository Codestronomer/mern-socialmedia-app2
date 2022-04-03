import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from './../controllers/posts.controller.js'

const router = express.Router()

router.get('/posts', getPosts)
router.post('/posts', createPost)
router.patch('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)
router.patch('/posts/:id/like', likePost)

export default router
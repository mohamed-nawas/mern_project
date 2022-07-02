import express from "express";
import {getPosts, createPost, updatePost} from "../controllers/posts.js";

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', createPost);
postsRouter.patch('/:id', updatePost);

export default postsRouter;
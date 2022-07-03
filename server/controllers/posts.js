import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// status codes used here
// 200          -           HttpStatus.OK
// 201          -           HttpStatus.CREATED
// 404          -           HttpStatus.NOTFOUND
// 409          -           HttpStatus.CONFLICT
// https://www.restapitutorial.com/httpstatuscodes.html

/**
 *
 * @param req Api request
 * @param res Api response
 * @returns {Promise<void>} Posts
 */
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (e) {
        res.status(404).json({message: e.message});
    }
};

/**
 *
 * @param req Api request
 * @param res Api response
 * @returns {Promise<void>} New post
 */
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (e) {
        res.status(409).json({message: e.message});
    }
};

/**
 *
 * @param req Api request
 * @param res Api response
 * @returns {Promise<void>} Updated post
 */
export const updatePost = async (req, res) => {
    try {
        const {id: _id} = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No post with the given id");

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

        res.status(200).json(updatedPost);
    } catch (e) {
        res.status(409).json({message: e.message});
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id: _id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No post with given id");

        await PostMessage.findByIdAndRemove(_id);

        res.status(200).json({message: "Post deleted successfully"});
    } catch (e) {
        res.status(409).json({message: e.message});
    }
}

export const likePost = async (req, res) => {
    try {
        const {id: _id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No post with given id");

        const post = await PostMessage.findById(_id);
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new: true});

        res.status(200).json(updatedPost);
    } catch (e) {
        res.status(409).json({message: e.message});
    }
}
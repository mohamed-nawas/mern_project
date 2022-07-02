import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// status codes
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
        res.status(409).json({message: e.message})
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

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});

        res.status(200).json(updatedPost);
    } catch (e) {
        res.status(409).json({message: e.message})
    }
}
import mongoose from "mongoose";
import postMessage from "../models/posts.model.js"


const getPosts = async (req, res) => {
    try {

        const postMessages = await postMessage.find()

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    const newPost = new postMessage({
        title: req.body.title,
        message: req.body.message,
        creator: req.body.creator,
        tags: req.body.tags,
        selectedFile: req.body.selectedFile,
        likeCount: req.body.likeCount,
    })

    try {
        newPost.save();

        res.status(200).json(newPost);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    const post = req.body;
    // const { message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that ID')
    }

    // const updatedPost = { creator, message, tags, selectedFile, _id: id };

    const updatedPost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.status(200).json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that ID')
    }

    await postMessage.findByIdAndRemove(_id);

    res.status(200).json({ message: 'Post deleted successfully' });
}

const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send('No post with that ID')
    }

    const post = await postMessage.findById(_id);
    const updatedPost = await postMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}

export { getPosts, createPost, updatePost, deletePost, likePost }
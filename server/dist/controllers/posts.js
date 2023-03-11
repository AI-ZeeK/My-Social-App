import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            location: user === null || user === void 0 ? void 0 : user.location,
            description,
            userPicturePath: user === null || user === void 0 ? void 0 : user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// Update comment
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post === null || post === void 0 ? void 0 : post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

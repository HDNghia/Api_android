const { PostReactions } = require("../models/posts/postReaction.js");
const { Users } = require("../models/users/users.js");
const { PostLikes } = require("../models/posts/postLike.js")

const postReactController = {
    //ADD A PostReaction
    addAPostReactions: (req, res) => {
        try {
            PostReactions.findOne({})
                .sort({ _id: 'desc' })
                .then(lastPostReaction => {
                    if (lastPostReaction) {
                        req.body._id = lastPostReaction._id + 1;
                        const newPostReaction = new PostReactions(req.body);
                        newPostReaction
                            .save()
                            .then(() => res.status(200).json(newPostReaction))
                    } else {
                        req.body._id = 1
                        const newPostReaction = new PostReactions(req.body);
                        newPostReaction
                            .save()
                            .then(() => res.status(200).json(newPostReaction))
                    }

                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET ALL PostReactions
    getAllPostReactions: async (req, res) => {
        try {
            const allPostReactions = await PostReactions.find();
            res.status(200).json(allPostReactions);
        } catch (err) {
            res.status(500).json(err);
        }
    },



    //GET A PostReaction
    getAUser: async (req, res) => {
        try {
            const PostReaction = await PostReactions.find({ postId: req.query.postId });
            let responeList = [];
            if (PostReaction) {
                await Promise.all(PostReaction.map(async (el) => {
                    const userInfo = await Users.findById(el.userId);
                    let item = {
                        ...el._doc,
                        userInfo
                    };
                    responeList.push(item);
                }))
            }
            res.status(200).json(responeList);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //DELETE POSt
    deletePostReact: async (req, res) => {
        try {
            const Post = await PostReactions.findById(req.params.id);
            console.log('delte')
            await Post.deleteOne();
            res.status(200).json("Deleted successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get all like
    getAllLike: async (req, res) => {
        try {
            const postAllLike = await PostLikes.find();
            res.status(200).json(postAllLike);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //POST A LIKE
    postALike: async (req, res) => {
        try {
            const postALike = await PostLikes.find({ $and: [{ userId: req.body.userId }, { postId: req.body.postId }] });
            console.log("check postALike: ", postALike)
            if (postALike.length == "") {
                PostLikes.findOne({})
                    .sort({ _id: 'desc' })
                    .then(lastPostReaction => {
                        if (lastPostReaction) {
                            req.body._id = lastPostReaction._id + 1;
                            const newPostReaction = new PostLikes(req.body);
                            newPostReaction
                                .save()
                                .then(() => res.status(200).json(newPostReaction))
                        } else {
                            req.body._id = 1
                            const newPostReaction = new PostLikes(req.body);
                            newPostReaction
                                .save()
                                .then(() => res.status(200).json(newPostReaction))
                        }
                    })
                res.status(200).json("voo if 1");
            } else {
                await PostLikes.find().deleteMany({ $and: [{ userId: req.body.userId }, { postId: req.body.postId }] });
                res.status(200).json("DELETE SUCCESSFULLY");
            }
        } catch (err) {
            res.status(500).json(err);
        }

    },


    //UPDATE PostReaction
    updatePostReactions: async (req, res) => {
        try {
            const PostReaction = await PostReactions.findById(req.params.id);
            await PostReaction.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

};

module.exports = postReactController;

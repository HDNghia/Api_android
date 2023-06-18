const { Posts } = require("../models/posts/posts.js");
const { PostReactions } = require("../models/posts/postReaction.js");
const { Users } = require("../models/users/users.js");
const { PostLikes } = require("../models/posts/postLike.js")

const userController = {
    //ADD A Post 
    addAPost: (req, res) => {
        try {
            Posts.findOne({})
                .sort({ _id: 'desc' })
                .then(lastPost => {
                    if (lastPost) {
                        req.body._id = lastPost._id + 1;
                        const newPost = new Posts(req.body);
                        newPost
                            .save()
                            .then(() => res.status(200).json(newPost))
                    } else {
                        req.body._id = 1
                        const newPost = new Posts(req.body);
                        newPost
                            .save()
                            .then(() => res.status(200).json(newPost))
                    }

                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL Posts
    getAllPosts: async (req, res) => {
        try {
            const allPosts = await Posts.find({}).sort({ _id: -1 });
            let responList = [];
            if (allPosts) {
                await Promise.all(allPosts.map(async (el) => {
                    // console.log(el._id)
                    let userInfo = await Users.findById(el.ownerId);
                    let CountComment = await countReaction(el._id);
                    let Countlike = await countLike(el._id);
                    let item = {
                        ...el._doc,
                        CountComment,
                        Countlike,
                        userInfo
                    }
                    responList.push(item);
                    console.log('chekc item: ', item);
                }))
            }
            responList.sort((a, b) => { if (a._id > b._id) return -1; return 1 });
            res.status(200).json(responList);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get Posts by ownerID
    getPostsByUserID: async (req, res) => {
        try {
            const allPosts = await Posts.find({ ownerId: req.params.id }).sort({ _id: 'desc' });
            let responList = [];
            // if (allPosts) allPosts.forEach((el) => {
            if (allPosts) {
                await Promise.all(allPosts.map(async (el) => {
                    let countReaction = await countReaction(el._id);
                    let item = {
                        ...el._doc,
                        countReaction
                    }
                    responList.push(item);
                }))
            }
            res.status(200).json(responList);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE POSt
    deletePost: async (req, res) => {
        try {
            const Post = await Posts.findById(req.params.id);
            console.log('delte')
            await Post.deleteOne();
            res.status(200).json("Deleted successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE Post
    updatePost: async (req, res) => {
        try {
            const Post = await Posts.findById(req.params.id);
            await Post.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

};
async function countReaction(postid) {
    const postReaction = await PostReactions.find({ $and: [{ postId: postid }, { isDisReact: false }] });
    return postReaction.length;
}
async function countLike(postid) {
    const countLike = await PostLikes.find({ postId: postid });
    return countLike.length;
}
module.exports = userController;

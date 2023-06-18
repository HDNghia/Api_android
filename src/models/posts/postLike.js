const mongoose = require("mongoose");

const PostLikesSchema = new mongoose.Schema({
    _id: { type: Number, require: true },
    postId: { type: Number, require: true },
    userId: { type: Number, require: true },
}, {
    _id: false,
    timestamp: true
});

let PostLikes = mongoose.model("PostLikes", PostLikesSchema);

module.exports = { PostLikes };
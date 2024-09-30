import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    uploadedBy: {
        type: String,
        required: true
    },
    uploadedByImage: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    shareCount: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostComments'
    }],
});

const Post = mongoose.model("Post", postSchema);
export default Post;

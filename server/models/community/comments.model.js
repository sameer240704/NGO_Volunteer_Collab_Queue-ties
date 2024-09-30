import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PostComments = mongoose.model("PostComments", commentsSchema);
export default PostComments;

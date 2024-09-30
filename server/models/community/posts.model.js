import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
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
    shareCount: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostComments'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Post", postSchema);
export default Task;

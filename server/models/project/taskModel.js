import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
    stage: {
        type: String,
        enum: ['Planning', 'Before Event', 'On Event Day', 'After Event'],
        default: 'Planning' // Default to Planning
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assigned volunteer
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", taskSchema);
export default Task;

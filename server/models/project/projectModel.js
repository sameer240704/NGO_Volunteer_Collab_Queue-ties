import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema({
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
        enum: ['Planning', 'Before Event', 'On Event Day', 'After Event'],
        default: 'Planning',
        required: true
    },
    progress: {
        type: Number,
        default: 0 // percentage of completed tasks
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Users with role 'volunteer' can join
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Admin who created the project
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;

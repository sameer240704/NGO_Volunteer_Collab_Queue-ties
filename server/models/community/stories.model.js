import mongoose from "mongoose";
const Schema = mongoose.Schema;

const storiesSchema = new Schema({
    uploadedBy: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000
    }

});

const Stories = mongoose.model("Stories", storiesSchema);
export default Stories;

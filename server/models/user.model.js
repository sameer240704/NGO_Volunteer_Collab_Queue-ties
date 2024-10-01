import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'volunteer'],
        required: true
    },
    address1: {
        type: String,
        required: function () {
            return this.role === 'admin';
        }
    },
    address2: {
        type: String,
        required: function () {
            return this.role === 'admin';
        }
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    primaryImage: {
        type: String,
        required: true,
    },
    ngoImages: [
        {
            type: String,
            required: function () {
                return this.role === 'admin';
            }
        }
    ],
    skills: {
        type: [String],
        required: function () {
            return this.role === 'volunteer';
        }
    }
});

const User = mongoose.model("User", userSchema);

export default User;

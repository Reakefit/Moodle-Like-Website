import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    courses: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = UserSession = mongoose.model("UserSession", UserSessionSchema);
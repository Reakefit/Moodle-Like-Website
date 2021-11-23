import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserCoursesSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    courses: {
        type: Array
    }
})

module.exports = UserCourses = mongoose.model("UserCourses", UserCoursesSchema);
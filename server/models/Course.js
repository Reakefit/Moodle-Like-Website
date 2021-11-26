import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseID: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    professorName: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        default: 100
    },
    credits: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://i.ibb.co/8M4zZ4b/72f66a206878131749cc4eb1b3cc7a293a0f729ce181159ef43e7e53f183e6a9a7bbc587f3a73c6e80f96a32593db8131ab3.jpg"
    },
    prerequisite: {
        type: Array
    },
    Url: {
        type: String
    }
});

export const Course = mongoose.model("Course", courseSchema);
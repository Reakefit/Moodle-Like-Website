import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      courses: {
        type: [String],
        default: []
      },
      credits: {
        type: Number,
        default: 0
      }
})

export const User = model("users", UserSchema);

import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
      userId: {
        type: Number,
        required: true,
        maxlength: 9
      },
      name: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      credits: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
}, {
  timestamps: true
})

UserSchema.methods.generateHash = (password) => {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8),null);
}

UserSchema.methods.validPassword = function(password) {
  return bcryptjs.compareSync(password,this.password);
};


export const User = mongoose.model("User", UserSchema);

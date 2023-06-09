import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 200,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

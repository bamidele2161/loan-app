const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      text: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 255,
      trim: true,
      text: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },

    occupation: {
      type: String,
      trim: true,
      text: true,
    },

    kinName: {
      type: String,
      trim: true,
      text: true,
    },
    kinPhone: {
      type: String,
      trim: true,
      text: true,
    },

    state: {
      type: String,
      trim: true,
      text: true,
    },

    lga: {
      type: String,
      trim: true,
      text: true,
    },
    twon: {
      type: String,
      trim: true,
      text: true,
    },
    dob: {
      type: String,
      trim: true,
      text: true,
    },

    bvn: {
      type: String,
      trim: true,
      text: true,
    },

    nin: {
      type: String,
      trim: true,
      text: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserDB = mongoose.model("UserDB", userSchema);
module.exports = UserDB;

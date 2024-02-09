const mongoose = require("mongoose");
const savingsSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    paid: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    balance: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    interest: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
  },
  {
    timestamps: true,
  }
);

const SavingsDB = mongoose.model("savings", savingsSchema);
module.exports = SavingsDB;

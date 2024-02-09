const mongoose = require("mongoose");
const loanSchema = new mongoose.Schema(
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

const LoanDB = mongoose.model("loan", loanSchema);
module.exports = LoanDB;

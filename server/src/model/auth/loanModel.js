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
    bankStatement: {
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

    firstguarantor: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    guarantoremail: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    secguarantor: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    secguarantoremail: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    bankname: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    accountname: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    accountno: {
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

const mongoose = require("mongoose");
const loanSchema = new mongoose.Schema(
  {
    amount: {
      type: String,

      trim: true,
      text: true,
    },
    status: {
      type: String,

      trim: true,
      text: true,
    },
    userEmail: {
      type: String,

      trim: true,
      text: true,
    },
    paid: {
      type: String,

      trim: true,
      text: true,
    },
    balance: {
      type: String,

      trim: true,
      text: true,
    },
    bankStatement: {
      type: String,

      trim: true,
      text: true,
    },

    interest: {
      type: String,

      trim: true,
      text: true,
    },

    firstguarantor: {
      type: String,

      trim: true,
      text: true,
    },
    guarantoremail: {
      type: String,

      trim: true,
      text: true,
    },
    secguarantor: {
      type: String,

      trim: true,
      text: true,
    },
    secguarantoremail: {
      type: String,

      trim: true,
      text: true,
    },
    duration: {
      type: String,

      trim: true,
      text: true,
    },
    bankname: {
      type: String,

      trim: true,
      text: true,
    },
    accountname: {
      type: String,

      trim: true,
      text: true,
    },
    accountno: {
      type: String,

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

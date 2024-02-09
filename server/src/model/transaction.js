const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const TransactionDB = mongoose.model("transaction", transactionSchema);
module.exports = TransactionDB;

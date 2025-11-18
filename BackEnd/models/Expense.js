const mongoose = require("mongoose");

const ExpenseSplitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const ExpenseSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Transportation", "Entertainment", "Utilities", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    splits: [ExpenseSplitSchema],
  },
  { timestamps: true }
);

// Method to calculate if expense is fully settled
ExpenseSchema.methods.isSettled = function () {
  return this.splits.every((split) => split.isPaid);
};

// Method to get total splits amount
ExpenseSchema.methods.getTotalSplits = function () {
  return this.splits.reduce((sum, split) => sum + split.amount, 0);
};

module.exports = mongoose.model("Expense", ExpenseSchema);

// expense.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// --- Split Subschema ---
const ExpenseSplitSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 },
  isPaid: { type: Boolean, default: false }
}, { _id: false }); // << use _id: false if you don't need split _id

// --- Main Expense Schema ---
const ExpenseSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  description: { type: String },
  amount: { type: Number, required: true, min: 0 },
  payer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['Food', 'Travel', 'Utilities', 'Other'], default: 'Other' },
  date: { type: Date, default: Date.now },
  splits: {
    type: [ExpenseSplitSchema],
    validate: {
      validator: function(arr) { return arr.length > 0; },
      message: 'Splits cannot be empty'
    }
  }
}, { timestamps: true });

// Optional: Custom validation on splits sum
ExpenseSchema.pre('save', function(next) {
  const totalSplits = this.splits.reduce((acc, split) => acc + split.amount, 0);
  if (totalSplits !== this.amount) {
    return next(new Error('Sum of splits does not equal total expense amount.'));
  }
  next();
});

// --- Instance Methods ---
ExpenseSchema.methods.isSettled = function() {
  return this.splits.every(split => split.isPaid);
};

ExpenseSchema.methods.getTotalSplits = function() {
  return this.splits.reduce((acc, split) => acc + split.amount, 0);
};

// --- Model Export ---
module.exports = mongoose.model('Expense', ExpenseSchema);

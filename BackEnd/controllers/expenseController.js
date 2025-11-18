const Expense = require('../models/Expense');
const Group = require('../models/Group');
const mongoose = require('mongoose');

// CREATE a new expense
exports.createExpense = async (req, res) => {
  try {
    const { groupId, description, amount, category, splits, date } = req.body;

    if (!groupId || !description || !amount || !splits || !Array.isArray(splits) || splits.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const group = await Group.findById(groupId).populate('members.user', '_id fullName email');
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (!group.isMember(req.user.id)) {
      return res.status(403).json({ message: "User is not a member of this group" });
    }

    // Validate amount
    const expenseAmount = Number(amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      return res.status(400).json({ message: "Invalid expense amount." });
    }

    // Validate splits
    for (const split of splits) {
      if (typeof split.amount !== 'number' || isNaN(split.amount) || split.amount < 0) {
        return res.status(400).json({ message: "Split amounts must be valid, non-negative numbers." });
      }
      if (!split.user) {
        return res.status(400).json({ message: "Each split must have a user." });
      }
    }

    // Ensure that split totals match the expense
    const totalSplits = splits.reduce((sum, split) => sum + split.amount, 0);
    if (Math.abs(totalSplits - expenseAmount) > 0.01) {
      return res.status(400).json({
        message: "Split amounts must equal total expense amount",
        totalSplits,
        expenseAmount
      });
    }

    const expenseObj = {
      group: groupId,
      description,
      amount: expenseAmount,
      payer: req.user.id,
      category: category || "Other",
      splits: splits.map(split => ({
        user: typeof split.user === "object" && split.user._id ? split.user._id : split.user,
        amount: split.amount,
        isPaid: !!split.isPaid,
      })),
      date: date ? new Date(date) : new Date(),
    };

    const expense = await Expense.create(expenseObj);

    await expense.populate('payer', '_id fullName email');
    await expense.populate('splits.user', '_id fullName email');

    res.status(201).json({
      message: "Expense created successfully.",
      expense,
    });
  } catch (error) {
    console.error('Error in createExpense:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation error.", details: error.errors });
    }
    res.status(500).json({ message: 'Server error while creating expense. Please check your data and try again.' });
  }
};

// GET expenses for group
exports.getExpensesByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.find({ group: groupId })
      .populate('payer', '_id fullName email')
      .populate('splits.user', '_id fullName email')
      .sort({ date: -1 });
    res.status(200).json({ expenses });
  } catch (error) {
    console.error('Error in getExpensesByGroup:', error);
    res.status(500).json({ message: 'Server error while fetching expenses.' });
  }
};

// GET expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id)
      .populate('payer', '_id fullName email')
      .populate('splits.user', '_id fullName email');
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ expense });
  } catch (error) {
    console.error('Error in getExpenseById:', error);
    res.status(500).json({ message: 'Server error while fetching expense.' });
  }
};

// UPDATE expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // Optionally: Add validation code here
    const updatedExpense = await Expense.findByIdAndUpdate(id, updates, { new: true })
      .populate('payer', '_id fullName email')
      .populate('splits.user', '_id fullName email');
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated.", expense: updatedExpense });
  } catch (error) {
    console.error('Error in updateExpense:', error);
    res.status(500).json({ message: 'Server error while updating expense.' });
  }
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted." });
  } catch (error) {
    console.error('Error in deleteExpense:', error);
    res.status(500).json({ message: 'Server error while deleting expense.' });
  }
};

// GET group balance
exports.getGroupBalance = async (req, res) => {
  try {
    const { groupId } = req.params;
    // You may need to adjust this query for your balance logic
    const group = await Group.findById(groupId).populate('members.user', '_id fullName email');
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    // Compute balances here or handle in your service
    // Example: send members or implement custom logic
    res.status(200).json({ balances: group.members });
  } catch (error) {
    console.error('Error in getGroupBalance:', error);
    res.status(500).json({ message: 'Server error while fetching group balance.' });
  }
};

// MARK split as paid
exports.markSplitPaid = async (req, res) => {
  try {
    const { id } = req.params; // expense id
    const { userId } = req.body;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const split = expense.splits.find(s => s.user.equals(userId));
    if (!split) {
      return res.status(404).json({ message: "Split not found for this user." });
    }
    split.isPaid = true;
    await expense.save();
    res.status(200).json({ message: "Marked as paid." });
  } catch (error) {
    console.error('Error in markSplitPaid:', error);
    res.status(500).json({ message: 'Server error while marking paid.' });
  }
};
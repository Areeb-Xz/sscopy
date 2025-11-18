const Expense = require("../models/Expense");
const Group = require("../models/Group");

// Create Expense
exports.createExpense = async (req, res) => {
  const { groupId, description, amount, category, splits } = req.body;

  // Validation
  if (!groupId || !description || !amount || !splits || splits.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is a member
    if (!group.isMember(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to add expense to this group" });
    }

    // Validate splits total equals expense amount
    const totalSplits = splits.reduce((sum, split) => sum + split.amount, 0);
    if (Math.abs(totalSplits - amount) > 0.01) {
      return res.status(400).json({ 
        message: "Split amounts must equal total expense amount",
        totalSplits,
        expenseAmount: amount
      });
    }

    // Create expense
    const expense = await Expense.create({
      group: groupId,
      description,
      amount,
      payer: req.user.id,
      category: category || "Other",
      splits,
    });

    // Populate references
    await expense.populate("payer", "fullName email");
    await expense.populate("splits.user", "fullName email");
    await expense.populate("group", "name");

    res.status(201).json({
      success: true,
      expense,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating expense", error: err.message });
  }
};

// Get Expenses by Group
exports.getExpensesByGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is a member
    if (!group.isMember(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to view this group's expenses" });
    }

    const expenses = await Expense.find({ group: req.params.groupId })
      .populate("payer", "fullName email")
      .populate("splits.user", "fullName email")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
};

// Get Single Expense
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate("payer", "fullName email")
      .populate("splits.user", "fullName email")
      .populate("group", "name");

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check if user is a member of the group
    const group = await Group.findById(expense.group._id);
    if (!group.isMember(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to view this expense" });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching expense", error: err.message });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  const { description, amount, category, splits } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Only payer can update expense
    if (expense.payer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the payer can update this expense" });
    }

    // Validate splits if provided
    if (splits) {
      const totalSplits = splits.reduce((sum, split) => sum + split.amount, 0);
      const expenseAmount = amount || expense.amount;
      
      if (Math.abs(totalSplits - expenseAmount) > 0.01) {
        return res.status(400).json({ 
          message: "Split amounts must equal total expense amount" 
        });
      }
    }

    // Update fields
    if (description) expense.description = description;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (splits) expense.splits = splits;

    await expense.save();
    await expense.populate("payer", "fullName email");
    await expense.populate("splits.user", "fullName email");

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating expense", error: err.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Only payer can delete expense
    if (expense.payer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the payer can delete this expense" });
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense", error: err.message });
  }
};

// Calculate Group Balance
exports.getGroupBalance = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is a member
    if (!group.isMember(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to view this group's balance" });
    }

    const expenses = await Expense.find({ group: req.params.groupId })
      .populate("payer", "fullName email")
      .populate("splits.user", "fullName email");

    // Calculate balances
    const balances = {};
    
    // Initialize all members with 0 balance
    group.members.forEach((member) => {
      balances[member.user.toString()] = {
        userId: member.user,
        balance: 0,
        paid: 0,
        owed: 0,
      };
    });

    // Calculate from expenses
    expenses.forEach((expense) => {
      const payerId = expense.payer._id.toString();
      
      // Add what payer paid
      if (balances[payerId]) {
        balances[payerId].paid += expense.amount;
      }

      // Subtract what each person owes
      expense.splits.forEach((split) => {
        const userId = split.user._id.toString();
        if (balances[userId]) {
          balances[userId].owed += split.amount;
        }
      });
    });

    // Calculate net balance (paid - owed)
    Object.keys(balances).forEach((userId) => {
      balances[userId].balance = balances[userId].paid - balances[userId].owed;
    });

    // Populate user details
    await Group.populate(group, { path: "members.user", select: "fullName email" });
    
    const balanceArray = Object.entries(balances).map(([userId, data]) => {
      const member = group.members.find(m => m.user._id.toString() === userId);
      return {
        user: member ? member.user : null,
        balance: data.balance,
        paid: data.paid,
        owed: data.owed,
      };
    });

    res.status(200).json({
      success: true,
      groupId: req.params.groupId,
      groupName: group.name,
      balances: balanceArray,
    });
  } catch (err) {
    res.status(500).json({ message: "Error calculating balance", error: err.message });
  }
};

// Mark Split as Paid
exports.markSplitPaid = async (req, res) => {
  const { splitUserId } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Only payer can mark splits as paid
    if (expense.payer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the payer can mark splits as paid" });
    }

    // Find and update split
    const split = expense.splits.find(
      (s) => s.user.toString() === splitUserId
    );

    if (!split) {
      return res.status(404).json({ message: "Split not found" });
    }

    split.isPaid = true;
    await expense.save();

    res.status(200).json({
      success: true,
      message: "Split marked as paid",
      expense,
    });
  } catch (err) {
    res.status(500).json({ message: "Error marking split as paid", error: err.message });
  }
};

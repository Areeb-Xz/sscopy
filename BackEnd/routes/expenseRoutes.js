const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpensesByGroup,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getGroupBalance,
  markSplitPaid,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createExpense);
router.get("/group/:groupId", protect, getExpensesByGroup);
router.get("/group/:groupId/balance", protect, getGroupBalance);
router.get("/:id", protect, getExpenseById);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
router.post("/:id/mark-paid", protect, markSplitPaid);

module.exports = router;

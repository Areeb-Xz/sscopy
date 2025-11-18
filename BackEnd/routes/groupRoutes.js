const express = require("express");
const router = express.Router();
const {
  createGroup,
  getUserGroups,
  getGroupById,
  addMember,
  removeMember,
  deleteGroup,
} = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createGroup);
router.get("/", protect, getUserGroups);
router.get("/:id", protect, getGroupById);
router.post("/:id/members", protect, addMember);
router.delete("/:id/members", protect, removeMember);
router.delete("/:id", protect, deleteGroup);

module.exports = router;

const Group = require("../models/Group");
const User = require("../models/User");

// Create Group
exports.createGroup = async (req, res) => {
  const { name, description, memberEmails } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: "Group name is required" });
  }

  try {
    // Create group with current user as admin
    const group = await Group.create({
      name,
      description,
      admin: req.user.id,
      members: [{ user: req.user.id }], // Admin is automatically a member
    });

    // Add additional members if provided
    if (memberEmails && memberEmails.length > 0) {
      for (const email of memberEmails) {
        const user = await User.findOne({ email });
        if (user && user._id.toString() !== req.user.id) {
          group.addMember(user._id);
        }
      }
      await group.save();
    }

    // Populate member details
    await group.populate("members.user", "fullName email");
    await group.populate("admin", "fullName email");

    res.status(201).json({
      success: true,
      group,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating group", error: err.message });
  }
};

// Get User's Groups
exports.getUserGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      "members.user": req.user.id,
    })
      .populate("admin", "fullName email")
      .populate("members.user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: groups.length,
      groups,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching groups", error: err.message });
  }
};

// Get Group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("admin", "fullName email")
      .populate("members.user", "fullName email");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is a member
    if (!group.isMember(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to view this group" });
    }

    res.status(200).json({
      success: true,
      group,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching group", error: err.message });
  }
};

// Add Member to Group
exports.addMember = async (req, res) => {
  const { email } = req.body;

  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is admin
    if (!group.isAdmin(req.user.id)) {
      return res.status(403).json({ message: "Only admin can add members" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add member
    if (group.isMember(user._id)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    group.addMember(user._id);
    await group.save();
    await group.populate("members.user", "fullName email");

    res.status(200).json({
      success: true,
      message: "Member added successfully",
      group,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding member", error: err.message });
  }
};

// Remove Member from Group
exports.removeMember = async (req, res) => {
  const { userId } = req.body;

  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is admin
    if (!group.isAdmin(req.user.id)) {
      return res.status(403).json({ message: "Only admin can remove members" });
    }

    // Can't remove admin
    if (group.isAdmin(userId)) {
      return res.status(400).json({ message: "Cannot remove group admin" });
    }

    group.removeMember(userId);
    await group.save();

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Error removing member", error: err.message });
  }
};

// Delete Group
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is admin
    if (!group.isAdmin(req.user.id)) {
      return res.status(403).json({ message: "Only admin can delete group" });
    }

    await group.deleteOne();

    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting group", error: err.message });
  }
};

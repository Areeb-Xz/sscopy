const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Method to check if user is a member
GroupSchema.methods.isMember = function (userId) {
  return this.members.some(
    (member) => member.user.toString() === userId.toString()
  );
};

// Method to check if user is admin
GroupSchema.methods.isAdmin = function (userId) {
  return this.admin.toString() === userId.toString();
};

// Method to add member
GroupSchema.methods.addMember = function (userId) {
  if (!this.isMember(userId)) {
    this.members.push({ user: userId });
  }
};

// Method to remove member
GroupSchema.methods.removeMember = function (userId) {
  this.members = this.members.filter(
    (member) => member.user.toString() !== userId.toString()
  );
};

module.exports = mongoose.model("Group", GroupSchema);

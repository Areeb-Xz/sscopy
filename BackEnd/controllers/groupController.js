import Group from '../models/Group.js';
import User from '../models/User.js';

export const createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Validate required field
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Group name is required',
        statusCode: 400,
      });
    }

    // Create new group
    const newGroup = new Group({
      name: name.trim(),
      description: description ? description.trim() : '',
      admin: req.user.userId,
      members: [
        {
          userId: req.user.userId,
          role: 'admin',
        },
      ],
    });

    await newGroup.save();
    await newGroup.populate('admin', 'firstName lastName email');
    await newGroup.populate('members.userId', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group: newGroup,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const listGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({ 'members.userId': req.user.userId })
      .populate('admin', 'firstName lastName email')
      .populate('members.userId', 'firstName lastName email')
      .sort({ createdDate: -1 });

    res.json({
      success: true,
      groups,
      count: groups.length,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate('admin', 'firstName lastName email')
      .populate('members.userId', 'firstName lastName email');

    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found',
        statusCode: 404,
      });
    }

    // Check if user is member of group
    const isMember = group.members.some(
      m => m.userId._id.toString() === req.user.userId
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        error: 'You are not a member of this group',
        statusCode: 403,
      });
    }

    res.json({
      success: true,
      group,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
        statusCode: 400,
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found',
        statusCode: 404,
      });
    }

    // Check if user is admin
    if (group.admin.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        error: 'Only admins can add members',
        statusCode: 403,
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        statusCode: 404,
      });
    }

    // Check if user is already a member
    const isMember = group.members.some(
      m => m.userId.toString() === user._id.toString()
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        error: 'User is already a member of this group',
        statusCode: 400,
      });
    }

    // Add member
    group.members.push({
      userId: user._id,
      role: 'member',
    });

    await group.save();
    await group.populate('members.userId', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Member added successfully',
      group,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
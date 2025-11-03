import express from 'express';
import {
  createGroup,
  listGroups,
  getGroup,
  addMember,
} from '../controllers/groupController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/api/groups', authMiddleware, createGroup);
router.get('/api/groups', authMiddleware, listGroups);
router.get('/api/groups/:groupId', authMiddleware, getGroup);
router.post('/api/groups/:groupId/members', authMiddleware, addMember);

export default router;
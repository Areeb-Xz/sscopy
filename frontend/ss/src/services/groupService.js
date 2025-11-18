import api from '../utils/api';

const groupService = {
  // Create new group
  createGroup: async (groupData) => {
    try {
      const response = await api.post('/groups', groupData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create group' };
    }
  },

  // Get all user's groups
  getMyGroups: async () => {
    try {
      const response = await api.get('/groups');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch groups' };
    }
  },

  // Get group by ID
  getGroupById: async (groupId) => {
    try {
      const response = await api.get(`/groups/${groupId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch group' };
    }
  },

  // Add member to group
  addMember: async (groupId, email) => {
    try {
      const response = await api.post(`/groups/${groupId}/members`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add member' };
    }
  },

  // Remove member from group
  removeMember: async (groupId, userId) => {
    try {
      const response = await api.delete(`/groups/${groupId}/members`, {
        data: { userId },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove member' };
    }
  },

  // Delete group
  deleteGroup: async (groupId) => {
    try {
      const response = await api.delete(`/groups/${groupId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete group' };
    }
  },
};

export default groupService;

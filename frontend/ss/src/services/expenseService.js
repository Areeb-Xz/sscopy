import api from '../utils/api';

const expenseService = {
  // Create new expense
  createExpense: async (expenseData) => {
    try {
      const response = await api.post('/expenses', expenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create expense' };
    }
  },

  // Get expenses for a group
  getGroupExpenses: async (groupId) => {
    try {
      const response = await api.get(`/expenses/group/${groupId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch expenses' };
    }
  },

  // Get group balance
  getGroupBalance: async (groupId) => {
    try {
      const response = await api.get(`/expenses/group/${groupId}/balance`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch balance' };
    }
  },

  // Get expense by ID
  getExpenseById: async (expenseId) => {
    try {
      const response = await api.get(`/expenses/${expenseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch expense' };
    }
  },

  // Update expense
  updateExpense: async (expenseId, expenseData) => {
    try {
      const response = await api.put(`/expenses/${expenseId}`, expenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update expense' };
    }
  },

  // Delete expense
  deleteExpense: async (expenseId) => {
    try {
      const response = await api.delete(`/expenses/${expenseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete expense' };
    }
  },

  // Mark split as paid
  markSplitPaid: async (expenseId, splitUserId) => {
    try {
      const response = await api.post(`/expenses/${expenseId}/mark-paid`, {
        splitUserId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark split as paid' };
    }
  },
};

export default expenseService;

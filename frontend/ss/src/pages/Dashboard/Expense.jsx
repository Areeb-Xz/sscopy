import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import expenseService from '../../services/expenseService';
import groupService from '../../services/groupService';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { FaPlus, FaEdit, FaTrash, FaReceipt, FaTimes } from 'react-icons/fa';

const Expense = () => {
  const { user } = useAuth();

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingExpense, setEditingExpense] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });
  
const categories = [
    "Food",
    "Rent",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Other",
  ];

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchExpenses();
      fetchBalances();
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getMyGroups();
      setGroups(data.groups || []);
      if (data.groups && data.groups.length > 0) {
        setSelectedGroup(data.groups[0]._id);
      }
    } catch (error) {
      toast.error('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseService.getGroupExpenses(selectedGroup);
      setExpenses(data.expenses || []);
    } catch (error) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchBalances = async () => {
    try {
      const data = await expenseService.getGroupBalances(selectedGroup);
      setBalances(data.balances || []);
    } catch (error) {
      console.error('Failed to load balances', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      setLoading(true);
      await expenseService.createExpense({
        ...formData,
        groupId: selectedGroup,
        amount: parseFloat(formData.amount),
      });
      toast.success('Expense created!');
      setShowCreateModal(false);
      resetForm();
      fetchExpenses();
      fetchBalances();
    } catch (error) {
      toast.error('Failed to create expense');
    } finally {
      setLoading(false);
    }
  };

  const handleEditExpense = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await expenseService.updateExpense(editingExpense._id, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      toast.success('Expense updated!');
      setShowEditModal(false);
      setEditingExpense(null);
      resetForm();
      fetchExpenses();
      fetchBalances();
    } catch (error) {
      toast.error('Failed to update expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      setLoading(true);
      await expenseService.deleteExpense(expenseId);
      toast.success('Expense deleted!');
      fetchExpenses();
      fetchBalances();
    } catch (error) {
      toast.error('Failed to delete expense');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: moment(expense.date).format('YYYY-MM-DD'),
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const getTotalExpenses = () =>
    expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2);

  const getMyBalance = () => {
    const myBalance = balances.find((b) => b.userId === user?.id);
    return myBalance ? myBalance.balance.toFixed(2) : '0.00';
  };

  // ------------------- Modal Component -------------------
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#6b7280',
              }}
            >
              <FaTimes />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // ------------------- Expense Form -------------------
  const ExpenseForm = ({ onSubmit, submitText }) => (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label
          style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
        >
          Description *
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          placeholder="e.g., Grocery shopping"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
          }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label
          style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
        >
          Amount ($) *
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
          step="0.01"
          min="0"
          placeholder="0.00"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
        >
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );

  // ------------------- If user has no groups -------------------
  if (groups.length === 0 && !loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1
          style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}
        >
          Expenses
        </h1>
        <div
          style={{
            padding: '60px',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
          }}
        >
          <FaReceipt
            style={{
              fontSize: '64px',
              color: '#d1d5db',
              marginBottom: '16px',
            }}
          />
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '12px' }}>
            No groups yet
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
            Create a group first to start tracking expenses
          </p>
        </div>
      </div>
    );
  }

  // ------------------- MAIN RENDER -------------------
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Expenses</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          disabled={!selectedGroup}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: selectedGroup ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            opacity: selectedGroup ? 1 : 0.5,
          }}
        >
          <FaPlus /> Add Expense
        </button>
      </div>

      {/* Group Selector */}
      {groups.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
          >
            Select Group:
          </label>
          <select
            value={selectedGroup || ''}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
            }}
          >
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedGroup && (
        <>
          {/* Summary Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                backgroundColor: '#eff6ff',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #93c5fd',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  color: '#1e40af',
                  marginBottom: '8px',
                }}
              >
                Total Expenses
              </h3>
              <p
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1e3a8a',
                }}
              >
                ${getTotalExpenses()}
              </p>
            </div>

            <div
              style={{
                backgroundColor:
                  parseFloat(getMyBalance()) >= 0 ? '#f0fdf4' : '#fef2f2',
                padding: '20px',
                borderRadius: '12px',
                border: `1px solid ${
                  parseFloat(getMyBalance()) >= 0 ? '#86efac' : '#fca5a5'
                }`,
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  color:
                    parseFloat(getMyBalance()) >= 0 ? '#15803d' : '#b91c1c',
                  marginBottom: '8px',
                }}
              >
                Your Balance
              </h3>
              <p
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color:
                    parseFloat(getMyBalance()) >= 0 ? '#166534' : '#991b1b',
                }}
              >
                ${getMyBalance()}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  marginTop: '4px',
                  color: '#6b7280',
                }}
              >
                {parseFloat(getMyBalance()) >= 0 ? 'You are owed' : 'You owe'}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#fef3c7',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #fbbf24',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  color: '#92400e',
                  marginBottom: '8px',
                }}
              >
                Total Items
              </h3>
              <p
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#78350f',
                }}
              >
                {expenses.length}
              </p>
            </div>
          </div>

          {/* EXPENSE LIST */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              Loading...
            </div>
          ) : expenses.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
              }}
            >
              <FaReceipt
                style={{
                  fontSize: '64px',
                  color: '#d1d5db',
                  marginBottom: '16px',
                }}
              />
              <p
                style={{ fontSize: '18px', color: '#6b7280', marginBottom: '12px' }}
              >
                No expenses yet
              </p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                Start adding expenses for this group
              </p>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
              }}
            >
              {expenses.map((exp) => (
                <div
                  key={exp._id}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {/* Left: Details */}
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600' }}>
                      {exp.description}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      {exp.category} • {moment(exp.date).format('MMM D, YYYY')}
                    </p>
                  </div>

                  {/* Right: Amount + actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                      ${exp.amount.toFixed(2)}
                    </p>

                    <button
                      onClick={() => openEditModal(exp)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3b82f6',
                        cursor: 'pointer',
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDeleteExpense(exp._id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* CREATE MODAL */}
      <Modal
        show={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Add Expense"
      >
        <ExpenseForm onSubmit={handleCreateExpense} submitText="Create Expense" />
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingExpense(null);
          resetForm();
        }}
        title="Edit Expense"
      >
        <ExpenseForm onSubmit={handleEditExpense} submitText="Save Changes" />
      </Modal>
    </div>
  );
};

export default Expense;
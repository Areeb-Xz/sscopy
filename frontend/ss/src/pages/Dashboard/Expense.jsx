import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import expenseService from '../../services/expenseService';
import groupService from '../../services/groupService';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { FaPlus, FaEdit, FaTrash, FaReceipt } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { useNavigate } from "react-router-dom";

// ------------------- Expense Form -------------------
const ExpenseForm = ({ onSubmit, submitText, formData, onInputChange, categories }) => (
  <form onSubmit={onSubmit}>
    <div style={{ marginBottom: '16px', fontFamily: "Inter, sans-serif" }}>
      <label
        style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
      >
        Description *
      </label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={onInputChange}
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
        onChange={onInputChange}
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
        onChange={onInputChange}
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
        onChange={onInputChange}
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
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          opacity: 1,
        }}
      >
        {submitText}
      </button>
    </div>
  </form>
);

const Expense = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentGroupDetails, setCurrentGroupDetails] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');

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
      fetchGroupDetails();
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
      const data = await expenseService.getGroupBalance(selectedGroup);
      setBalances(data.balances || []);
    } catch (error) {
      console.error('Failed to load balances', error);
    }
  };

  const fetchGroupDetails = async () => {
    if (!selectedGroup) return;
    try {
      const data = await groupService.getGroupById(selectedGroup);
      setCurrentGroupDetails(data.group);
    } catch (error) {
      console.error('Failed to load group details', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      toast.error('Fill required fields');
      return;
    }
    if (!selectedGroup) {
      toast.error('Select a group');
      return;
    }

    try {
      // get current group details and members
      const groupData = await groupService.getGroupById(selectedGroup);
      const members = groupData.group.members || [];

      if (!members.length) {
        toast.error('Group has no members');
        return;
      }

      const amount = parseFloat(formData.amount);

      // Build equal splits
      const splitAmount = amount / members.length;
      const splits = members.map((member) => ({
        user: member.user._id,
        amount: splitAmount,
        isPaid: member.user._id === user.id, // payer marks their own split paid
      }));

      // Build full expense object
      const expense = {
        groupId: selectedGroup,
        description: formData.description,
        amount,
        category: formData.category,
        date: formData.date,
        payer: user.id,    // from auth context
        splits,
      };

      await expenseService.createExpense(expense);
      toast.success('Expense created!');
      setShowCreateModal(false);
      resetForm();
      fetchExpenses();
      fetchBalances();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create expense');
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

  const handleInviteMember = async (e) => {
    e.preventDefault();
    setInviteError('');

    if (!inviteEmail.trim()) {
      setInviteError('Please enter an email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      setInviteError('Please enter a valid email address');
      return;
    }

    try {
      await groupService.addMember(selectedGroup, inviteEmail.trim());
      toast.success('Member invited successfully!');
      setInviteEmail('');
      setShowInviteModal(false);
      fetchGroupDetails(); // Refresh the members listc
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to invite member';
      setInviteError(msg);
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
    const myBalance = balances.find(b => b.userId === user?.id);
    return myBalance && myBalance.balance !== undefined
      ? myBalance.balance.toFixed(2)
      : '0.00';
  };


  // ------------------- If user has no groups -------------------
  if (groups.length === 0 && !loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: "Inter, sans-serif" }}>
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
      <button
        type="button"
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          background: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
        onClick={() => navigate('/dashboard')}
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Inter' }}>Expenses</h1>

        {selectedGroup && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
            <button
              onClick={() => setShowInviteModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#10b981')}
            >
              <FaPlus /> Invite Member
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563eb')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
            >
              <FaPlus /> Add Expense
            </button>
          </div>
        )}
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
      {/* Group Members */}
      {selectedGroup && currentGroupDetails && (
        <div style={{ marginBottom: '20px', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#1f2937' }}>
            Group Members ({currentGroupDetails.members?.length || 0})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {currentGroupDetails.members?.map((member) => (
              <div
                key={member.user._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '12px',
                  }}
                >
                  {member.user.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span style={{ color: '#374151' }}>
                  {member.user.fullName || member.user.email}
                  {member.user.id === user?.id && <span style={{ color: '#6b7280', marginLeft: '4px' }}>(You)</span>}
                </span>
              </div>
            ))}
          </div>
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
                border: `1px solid ${parseFloat(getMyBalance()) >= 0 ? '#86efac' : '#fca5a5'
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

      {/* Invite Member Modal */}
      <Modal show={showInviteModal} onClose={() => {
        setShowInviteModal(false);
        setInviteEmail('');
        setInviteError('');
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px', color: '#1f2937' }}>
          Invite Member to Group
        </h2>

        {inviteError && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            color: '#991b1b',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {inviteError}
          </div>
        )}

        <form onSubmit={handleInviteMember}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="friend@example.com"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px'
              }}
            />
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
              Enter the email address of the person you want to add to this group
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => {
                setShowInviteModal(false);
                setInviteEmail('');
                setInviteError('');
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Send Invite
            </button>
          </div>
        </form>
      </Modal>

      {/* CREATE MODAL */}
      <Modal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Expense"
      >
        <ExpenseForm
          onSubmit={handleCreateExpense}
          submitText="Create Expense"
          formData={formData}
          onInputChange={handleInputChange}
          categories={categories}
          loading={loading}
        />
      </Modal>

      <Modal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingExpense(null);
          resetForm();
        }}
        title="Edit Expense"
      >
        <ExpenseForm
          onSubmit={handleEditExpense}
          submitText="Save Changes"
          formData={formData}
          onInputChange={handleInputChange}     // Use the edit-version if you have a separate one
          categories={categories}
        />
      </Modal>

    </div>
  );
};

export default Expense;
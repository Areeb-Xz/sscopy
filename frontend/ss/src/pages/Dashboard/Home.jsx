import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';
import api from "../../utils/api";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
  });
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
    // Initialize profile data from user
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    }
  }, [user]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getMyGroups();
      setGroups(data.groups || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      await groupService.createGroup(newGroup);
      setNewGroup({ name: '', description: '' });
      setShowCreateForm(false);
      fetchGroups();
    } catch (err) {
      setError(err.message || 'Failed to create group');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    // Basic validation
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmNewPassword) {
      setProfileError('New passwords do not match');
      return;
    }
    if (profileData.newPassword && profileData.newPassword.length < 8) {
      setProfileError('New password must be at least 8 characters');
      return;
    }

    try {
      const body = {
        fullName: profileData.fullName,
        email: profileData.email,
      };

      if (profileData.newPassword) {
        body.currentPassword = profileData.currentPassword || '';
        body.newPassword = profileData.newPassword;
      }

      const { data } = await api.put('/auth/me', body);

      // Update AuthContext so name refreshes immediately
      updateUser(data.user);

      setProfileSuccess('Profile updated successfully!');
      setProfileData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));

      setTimeout(() => {
        setShowProfileModal(false);
        setProfileSuccess('');
      }, 1000);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to update profile';
      setProfileError(msg);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f0f7fa 60%, #e5eff5 100%)",
        fontFamily: "Inter, sans-serif",
        padding: "0"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(37,99,235,0.3)"
              }}
            >
              SS
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700", color: "#1f2937" }}>
                SplitSmart
              </h1>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280" }}>
                Welcome, {user?.fullName || user?.email}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={() => setShowProfileModal(true)}
              style={{
                padding: "10px 20px",
                background: "#f3f4f6",
                color: "#374151",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.95rem",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#f3f4f6";
              }}
            >
              Profile
            </button>

            <button
              onClick={logout}
              style={{
                padding: "10px 20px",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.95rem",
                boxShadow: "0 2px 8px rgba(239,68,68,0.2)",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "#dc2626"}
              onMouseLeave={(e) => e.target.style.background = "#ef4444"}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* PROFILE MODAL */}
      {showProfileModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setShowProfileModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 16,
              maxWidth: 500,
              width: "90%",
              padding: "32px 28px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
            }}
          >
            <h2 style={{ margin: "0 0 24px 0", fontSize: "1.8rem", fontWeight: "700", color: "#1f2937" }}>
              Edit Profile
            </h2>

            {profileError && (
              <div
                style={{
                  padding: "12px 16px",
                  marginBottom: 16,
                  background: "#fee",
                  border: "1px solid #fcc",
                  borderRadius: 8,
                  color: "#c33",
                  fontSize: "0.9rem"
                }}
              >
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div
                style={{
                  padding: "12px 16px",
                  marginBottom: 16,
                  background: "#d1fae5",
                  border: "1px solid #6ee7b7",
                  borderRadius: 8,
                  color: "#065f46",
                  fontSize: "0.9rem"
                }}
              >
                {profileSuccess}
              </div>
            )}

            <form onSubmit={handleProfileUpdate}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: "1rem",
                    background: "#f9fafb"
                  }}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: "1rem",
                    background: "#f9fafb"
                  }}
                />
              </div>

              <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

              <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: 16 }}>
                Leave password fields empty to keep current password
              </p>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: "1rem",
                    background: "#f9fafb"
                  }}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                  placeholder="At least 8 characters"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: "1rem",
                    background: "#f9fafb"
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={profileData.confirmNewPassword}
                  onChange={(e) => setProfileData({ ...profileData, confirmNewPassword: e.target.value })}
                  placeholder="Re-enter new password"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: "1rem",
                    background: "#f9fafb"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileModal(false);
                    setProfileError('');
                    setProfileSuccess('');
                  }}
                  style={{
                    padding: "12px 24px",
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "1rem"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.25)"
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Page Title + Create Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: "700", color: "#1f2937" }}>
              Your Groups
            </h2>
            <p style={{ margin: "6px 0 0 0", fontSize: "1rem", color: "#6b7280" }}>
              Manage your expense groups and track shared costs
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              padding: "12px 24px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
            onMouseLeave={(e) => e.target.style.background = "#2563eb"}
          >
            + Create Group
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            style={{
              padding: "14px 18px",
              marginBottom: 24,
              background: "#fee",
              border: "1px solid #fcc",
              borderRadius: 10,
              color: "#c33",
              fontSize: "0.95rem"
            }}
          >
            {error}
          </div>
        )}

        {/* CREATE FORM */}
        {showCreateForm && (
          <div
            style={{
              background: "#fff",
              padding: "28px",
              borderRadius: 12,
              marginBottom: 28,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb"
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1.4rem", fontWeight: "700", color: "#1f2937" }}>
              Create New Group
            </h3>
            <form onSubmit={handleCreateGroup}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  Group Name *
                </label>
                <input
                  type="text"
                  required
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g., Weekend Trip"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: "1rem",
                    background: "#f9fafb"
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  Description (Optional)
                </label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Brief description of the group..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: "1rem",
                    background: "#f9fafb",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewGroup({ name: '', description: '' });
                  }}
                  style={{
                    padding: "10px 20px",
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.95rem"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.25)"
                  }}
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        )}

        {/* GROUPS LIST */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div
              style={{
                display: "inline-block",
                width: 50,
                height: 50,
                border: "4px solid #e5e7eb",
                borderTop: "4px solid #2563eb",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}
            />
            <p style={{ marginTop: 16, color: "#6b7280", fontSize: "1rem" }}>Loading groups...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
          </div>
        ) : groups.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "#fff",
              borderRadius: 12,
              border: "2px dashed #d1d5db"
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: 16 }}>📊</div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.3rem", fontWeight: "600", color: "#374151" }}>
              No groups yet
            </h3>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "1rem" }}>
              Create your first group to get started!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20
            }}
          >
            {groups.map((group) => (
              <div
                key={group._id}
                onClick={() => navigate('/expenses')}
                style={{
                  background: "#fff",
                  padding: "24px",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "1.3rem", fontWeight: "700", color: "#1f2937" }}>
                  {group.name}
                </h3>
                {group.description && (
                  <p style={{ margin: "0 0 16px 0", color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {group.description}
                  </p>
                )}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: 20,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#1e40af"
                  }}
                >
                  👥 {group.members?.length || 0} member{group.members?.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
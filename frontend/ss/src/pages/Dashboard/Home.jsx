import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

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
      fetchGroups(); // Refresh list
    } catch (err) {
      setError(err.message || 'Failed to create group');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1>Welcome, {user?.fullName}!</h1>
          <p style={{ color: '#666' }}>Manage your expense groups</p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: '#fee', 
          color: '#c33',
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}

      {/* Create Group Button */}
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        {showCreateForm ? 'Cancel' : '+ Create New Group'}
      </button>

      {/* Create Group Form */}
      {showCreateForm && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>Create New Group</h3>
          <form onSubmit={handleCreateGroup}>
            <div style={{ marginBottom: '15px' }}>
              <label>Group Name:</label>
              <input
                type="text"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                required
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Description (optional):</label>
              <textarea
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  marginTop: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '80px'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Create Group
            </button>
          </form>
        </div>
      )}

      {/* Groups List */}
      <h2>Your Groups</h2>
      {loading ? (
        <p>Loading groups...</p>
      ) : groups.length === 0 ? (
        <p>No groups yet. Create your first group to get started!</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {groups.map((group) => (
            <div
              key={group._id}
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onClick={() => navigate(`/expenses?group=${group._id}`)}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <h3 style={{ marginTop: 0 }}>{group.name}</h3>
              {group.description && (
                <p style={{ color: '#666', fontSize: '14px' }}>{group.description}</p>
              )}
              <p style={{ fontSize: '12px', color: '#999' }}>
                {group.members?.length || 0} member(s)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

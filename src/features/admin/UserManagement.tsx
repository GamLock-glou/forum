import { useState } from 'react';
import { Edit, Save, X, Shield, ShieldOff } from 'lucide-react';
import { useUserStore } from '@/entities/user';
import { useSessionStore } from '@/features/session';
import { usersApi } from '@/entities/user';
import { Button } from '@/shared/ui/Button';
import type { TUser } from '@/entities/user';

interface EditableUserRowProps {
  user: TUser;
  onSave: (userId: number, updates: Partial<TUser>) => void;
}

const EditableUserRow = ({ user, onSave }: EditableUserRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin || false,
  });

  const handleSave = async () => {
    try {
      await usersApi.update(user.id, editData);
      onSave(user.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin || false,
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <tr className="user-row">
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>@{user.username}</td>
        <td>{user.email}</td>
        <td>
          {user.isAdmin ? (
            <span className="admin-badge">
              <Shield size={14} />
              Admin
            </span>
          ) : (
            <span className="user-badge">
              <ShieldOff size={14} />
              User
            </span>
          )}
        </td>
        <td>
          <Button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            variant="secondary"
            size="sm"
          >
            <Edit size={14} />
            Edit
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="user-row editing">
      <td>{user.id}</td>
      <td>
        <input
          value={editData.name}
          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
        />
      </td>
      <td>
        <input
          value={editData.username}
          onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
        />
      </td>
      <td>
        <input
          value={editData.email}
          type="email"
          onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
        />
      </td>
      <td>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={editData.isAdmin}
            onChange={(e) => setEditData(prev => ({ ...prev, isAdmin: e.target.checked }))}
          />
          Admin
        </label>
      </td>
      <td>
        <div className="edit-actions">
          <Button 
            className="save-btn"
            onClick={handleSave}
            variant="primary"
            size="sm"
          >
            <Save size={14} />
          </Button>
          <Button 
            className="cancel-btn"
            onClick={handleCancel}
            variant="secondary"
            size="sm"
          >
            <X size={14} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export const UserManagement = () => {
  const { users, updateUser } = useUserStore();
  const { currentUser } = useSessionStore();

  const handleUserUpdate = (userId: number, updates: Partial<TUser>) => {
    updateUser(userId, updates);
  };

  return (
    <div className="user-management">
      <h3>User Management</h3>
      <p>Total users: {users.length}</p>
      
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <EditableUserRow
                key={user.id}
                user={user}
                onSave={handleUserUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
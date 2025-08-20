import { useState, memo, useCallback } from 'react';
import { Edit, Save, X, Shield, ShieldOff } from 'lucide-react';
import { usersApi } from '@/entities/user';
import type { TUser } from '@/entities/user';
import { VirtualizedTable } from '@/shared/ui/VirtualizedTable';
import styles from './styles.module.css';

interface VirtualizedUserTableProps {
  users: TUser[];
  onUpdateUser: (userId: number, updates: Partial<TUser>) => void;
}

interface EditingState {
  [userId: number]: {
    name: string;
    username: string;
    email: string;
    isAdmin: boolean;
  };
}

export const VirtualizedUserTable = memo(({ users, onUpdateUser }: VirtualizedUserTableProps) => {
  const [editingUsers, setEditingUsers] = useState<Set<number>>(new Set());
  const [editingData, setEditingData] = useState<EditingState>({});

  const startEditing = useCallback((user: TUser) => {
    setEditingUsers(prev => new Set(prev).add(user.id));
    setEditingData(prev => ({
      ...prev,
      [user.id]: {
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
      }
    }));
  }, []);

  const cancelEditing = useCallback((userId: number) => {
    setEditingUsers(prev => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
    setEditingData(prev => {
      const newData = { ...prev };
      delete newData[userId];
      return newData;
    });
  }, []);

  const saveUser = useCallback(async (userId: number) => {
    const data = editingData[userId];
    if (!data) return;

    try {
      await usersApi.update(userId, data);
      onUpdateUser(userId, data);
      cancelEditing(userId);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }, [editingData, onUpdateUser, cancelEditing]);

  const updateEditingData = useCallback((userId: number, field: string, value: string | boolean) => {
    setEditingData(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value
      }
    }));
  }, []);

  const renderUserRow = useCallback((user: TUser) => {
    const isEditing = editingUsers.has(user.id);
    const editData = editingData[user.id];

    return (
      <div className={`${styles.userRow} ${isEditing ? styles.editing : ''}`}>
        <div className={styles.userCell}>{user.id}</div>
        
        <div className={styles.userCell}>
          {isEditing ? (
            <input
              className={styles.editInput}
              value={editData?.name || ''}
              onChange={(e) => updateEditingData(user.id, 'name', e.target.value)}
            />
          ) : (
            user.name
          )}
        </div>
        
        <div className={styles.userCell}>
          {isEditing ? (
            <input
              className={styles.editInput}
              value={editData?.username || ''}
              onChange={(e) => updateEditingData(user.id, 'username', e.target.value)}
            />
          ) : (
            `@${user.username}`
          )}
        </div>
        
        <div className={styles.userCell}>
          {isEditing ? (
            <input
              className={styles.editInput}
              type="email"
              value={editData?.email || ''}
              onChange={(e) => updateEditingData(user.id, 'email', e.target.value)}
            />
          ) : (
            user.email
          )}
        </div>
        
        <div className={styles.userCell}>
          {isEditing ? (
            <label className={styles.adminToggle}>
              <input
                type="checkbox"
                checked={editData?.isAdmin || false}
                onChange={(e) => updateEditingData(user.id, 'isAdmin', e.target.checked)}
              />
              Admin
            </label>
          ) : (
            user.isAdmin ? (
              <span className={styles.adminBadge}>
                <Shield size={14} />
                Admin
              </span>
            ) : (
              <span className={styles.userBadge}>
                <ShieldOff size={14} />
                User
              </span>
            )
          )}
        </div>
        
        <div className={styles.userCell}>
          {isEditing ? (
            <div className={styles.editActions}>
              <button 
                className={styles.saveBtn}
                onClick={() => saveUser(user.id)}
              >
                <Save size={14} />
              </button>
              <button 
                className={styles.cancelBtn}
                onClick={() => cancelEditing(user.id)}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button 
              className={styles.editBtn}
              onClick={() => startEditing(user)}
            >
              <Edit size={14} />
              Edit
            </button>
          )}
        </div>
      </div>
    );
  }, [editingUsers, editingData, startEditing, cancelEditing, saveUser, updateEditingData]);

  const headers = ['ID', 'Name', 'Username', 'Email', 'Role', 'Actions'];

  return (
    <VirtualizedTable
      items={users}
      height={400}
      itemHeight={60}
      headers={headers}
      renderRow={renderUserRow}
      className={styles.userTable}
    />
  );
});

VirtualizedUserTable.displayName = 'VirtualizedUserTable';
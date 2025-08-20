import { useUserStore } from '@/entities/user';
import type { TUser } from '@/entities/user';
import { VirtualizedUserTable } from './VirtualizedUserTable';
import styles from './UserManagement.module.css';


export const UserManagement = () => {
  const { users, updateUser } = useUserStore();

  const handleUserUpdate = (userId: number, updates: Partial<TUser>) => {
    updateUser(userId, updates);
  };

  return (
    <div className={styles.userManagement}>
      <h3>User Management</h3>
      <p>Total users: {users.length}</p>

      <VirtualizedUserTable 
        users={users}
        onUpdateUser={handleUserUpdate}
      />
    </div>
  );
};
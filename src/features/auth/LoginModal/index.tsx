import { memo, useState, useEffect, useMemo } from 'react';
import { User } from 'lucide-react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { useUserStore } from '@/entities/user';
import { useSessionStore } from '@/features/session';
import { usersApi } from '@/entities/user';
import type { TUser } from '@/entities/user';
import styles from './styles.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = memo(({ isOpen, onClose }: LoginModalProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number | string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { users, setUsers } = useUserStore();
  const { login } = useSessionStore();

  const userOptions: SelectOption[] = useMemo(() => 
    users.map(user => ({
      value: user.id,
      label: user.name,
      description: `@${user.username} • ${user.email}`,
      icon: <User size={18} />
    })),
    [users]
  );

  useEffect(() => {
    if (isOpen && users.length === 0) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await usersApi.getAll();
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isOpen, users.length, setUsers]);

  const handleLogin = () => {
    if (selectedUserId) {
      const selectedUser = users.find(user => user.id === Number(selectedUserId));
      if (selectedUser) {
        const userWithAdminStatus: TUser = {
          ...selectedUser,
          isAdmin: isAdmin
        };
        login(userWithAdminStatus);
        onClose();
        setSelectedUserId('');
        setIsAdmin(false);
      }
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedUserId('');
    setIsAdmin(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Choose User to Login"
      size="md"
    >
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Loading users...</div>
        ) : (
          <div className={styles.form}>
            <Select
              label="Select User"
              options={userOptions}
              value={selectedUserId}
              onChange={setSelectedUserId}
              placeholder="Choose a user to login as"
              size="md"
            />

            <div className={styles.adminOption}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                Login as Admin
              </label>
            </div>

            <div className={styles.footer}>
              <Button
                onClick={handleClose}
                variant="secondary"
                size="md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogin}
                variant="primary"
                size="md"
                disabled={!selectedUserId}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
});
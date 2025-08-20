import { useUserStore } from '@/entities/user';
import { usePostStore } from '@/entities/post';

export const UserFilter = () => {
  const { users } = useUserStore();
  const { selectedUserId, setSelectedUserId } = usePostStore();

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value ? Number(e.target.value) : null;
    setSelectedUserId(userId);
  };

  return (
    <div className="user-filter">
      <label htmlFor="user-select">Filter by user:</label>
      <select 
        id="user-select"
        value={selectedUserId || ''}
        onChange={handleUserChange}
        className="user-filter__select"
      >
        <option value="">All users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} (@{user.username})
          </option>
        ))}
      </select>
    </div>
  );
};
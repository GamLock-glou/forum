import { usePostStore } from '@/entities/post';
import { useUserStore } from '@/entities/user';
import { VirtualizedPostTable } from './VirtualizedPostTable';
import styles from './PostManagement.module.css';


export const PostManagement = () => {
  const { posts, updatePost, deletePost } = usePostStore();
  const { users } = useUserStore();

  const handleIncreasePriority = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      const newPriority = (post.priority || 0) + 1;
      updatePost(postId, { priority: newPriority });
    }
  };

  const handleDecreasePriority = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      const newPriority = Math.max(0, (post.priority || 0) - 1);
      updatePost(postId, { priority: newPriority });
    }
  };

  const handleDelete = (postId: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const aPriority = a.priority || 0;
    const bPriority = b.priority || 0;
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    return b.id - a.id;
  });

  return (
    <div className={styles.postManagement}>
      <h3>Post Management</h3>
      <p>Total posts: {posts.length}</p>
      
      <VirtualizedPostTable
        posts={sortedPosts}
        users={users}
        onIncreasePriority={handleIncreasePriority}
        onDecreasePriority={handleDecreasePriority}
        onDelete={handleDelete}
      />
    </div>
  );
};
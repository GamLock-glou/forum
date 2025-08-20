import { ChevronUp, ChevronDown, Trash2, Star } from 'lucide-react';
import { usePostStore } from '@/entities/post';
import { useUserStore } from '@/entities/user';
import { Button } from '@/shared/ui/Button';
import type { TPostWithInteractions } from '@/entities/post';

interface PostRowProps {
  post: TPostWithInteractions;
  author?: string;
  onIncreasePriority: (postId: number) => void;
  onDecreasePriority: (postId: number) => void;
  onDelete: (postId: number) => void;
}

const PostRow = ({ 
  post, 
  author, 
  onIncreasePriority, 
  onDecreasePriority, 
  onDelete 
}: PostRowProps) => {
  return (
    <tr className="post-row">
      <td>{post.id}</td>
      <td className="post-title-cell">
        <div className="post-title">{post.title}</div>
        <div className="post-body">{post.body.substring(0, 100)}...</div>
      </td>
      <td>{author || 'Unknown'}</td>
      <td>
        <div className="post-stats">
          <span className="likes">{post.likes} 👍</span>
          <span className="dislikes">{post.dislikes} 👎</span>
        </div>
      </td>
      <td>
        <div className="priority-display">
          <Star size={14} fill={post.priority && post.priority > 0 ? 'gold' : 'none'} />
          <span>{post.priority || 0}</span>
        </div>
      </td>
      <td>
        <div className="post-actions">
          <Button
            className="priority-btn increase"
            onClick={() => onIncreasePriority(post.id)}
            title="Increase priority"
            variant="secondary"
            size="sm"
          >
            <ChevronUp size={16} />
          </Button>
          <Button
            className="priority-btn decrease"
            onClick={() => onDecreasePriority(post.id)}
            title="Decrease priority"
            variant="secondary"
            size="sm"
          >
            <ChevronDown size={16} />
          </Button>
          <Button
            className="delete-btn"
            onClick={() => onDelete(post.id)}
            title="Delete post"
            variant="danger"
            size="sm"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

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
    <div className="post-management">
      <h3>Post Management</h3>
      <p>Total posts: {posts.length}</p>
      
      <div className="posts-table-wrapper">
        <table className="posts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Content</th>
              <th>Author</th>
              <th>Stats</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map(post => {
              const author = users.find(user => user.id === post.userId);
              return (
                <PostRow
                  key={post.id}
                  post={post}
                  author={author?.name}
                  onIncreasePriority={handleIncreasePriority}
                  onDecreasePriority={handleDecreasePriority}
                  onDelete={handleDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
import { memo, useCallback } from 'react';
import { ChevronUp, ChevronDown, Trash2, Star } from 'lucide-react';
import type { TPostWithInteractions } from '@/entities/post';
import type { TUser } from '@/entities/user';
import { VirtualizedTable } from '@/shared/ui/VirtualizedTable';
import styles from './styles.module.css';

interface VirtualizedPostTableProps {
  posts: TPostWithInteractions[];
  users: TUser[];
  onIncreasePriority: (postId: number) => void;
  onDecreasePriority: (postId: number) => void;
  onDelete: (postId: number) => void;
}

export const VirtualizedPostTable = memo(({ 
  posts, 
  users,
  onIncreasePriority, 
  onDecreasePriority, 
  onDelete 
}: VirtualizedPostTableProps) => {
  const renderPostRow = useCallback((post: TPostWithInteractions) => {
    const author = users.find(user => user.id === post.userId);
    
    return (
      <div className={styles.postRow}>
        <div className={styles.postCell}>{post.id}</div>
        
        <div className={`${styles.postCell} ${styles.contentCell}`}>
          <div className={styles.postTitle}>{post.title}</div>
          <div className={styles.postBody}>{post.body.substring(0, 100)}...</div>
        </div>
        
        <div className={styles.postCell}>{author?.name || 'Unknown'}</div>
        
        <div className={styles.postCell}>
          <div className={styles.postStats}>
            <span className={styles.likes}>{post.likes} 👍</span>
            <span className={styles.dislikes}>{post.dislikes} 👎</span>
          </div>
        </div>
        
        <div className={styles.postCell}>
          <div className={styles.priorityDisplay}>
            <Star size={14} fill={post.priority && post.priority > 0 ? 'gold' : 'none'} />
            <span>{post.priority || 0}</span>
          </div>
        </div>
        
        <div className={styles.postCell}>
          <div className={styles.postActions}>
            <button
              className={`${styles.priorityBtn} ${styles.increase}`}
              onClick={() => onIncreasePriority(post.id)}
              title="Increase priority"
            >
              <ChevronUp size={16} />
            </button>
            <button
              className={`${styles.priorityBtn} ${styles.decrease}`}
              onClick={() => onDecreasePriority(post.id)}
              title="Decrease priority"
            >
              <ChevronDown size={16} />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(post.id)}
              title="Delete post"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }, [users, onIncreasePriority, onDecreasePriority, onDelete]);

  const headers = ['ID', 'Content', 'Author', 'Stats', 'Priority', 'Actions'];
  const columnWidths = ['80px', '300px', '150px', '120px', '100px', '150px'];

  return (
    <VirtualizedTable
      items={posts}
      height={400}
      itemHeight={150}
      headers={headers}
      renderRow={renderPostRow}
      className={styles.postTable}
      columnWidths={columnWidths}
    />
  );
});

VirtualizedPostTable.displayName = 'VirtualizedPostTable';
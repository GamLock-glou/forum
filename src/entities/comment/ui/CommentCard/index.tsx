import { memo, useCallback } from 'react';
import { Trash2, Mail } from 'lucide-react';
import { useSessionStore } from '@/features/session';
import { useCommentStore } from '@/entities/comment';
import type { TComment } from '@/entities/comment';
import styles from './styles.module.css';

interface CommentCardProps {
  comment: TComment;
}

export const CommentCard = memo(({ comment }: CommentCardProps) => {
  const { isAdmin, currentUser } = useSessionStore();
  const { deleteComment } = useCommentStore();

  const handleDelete = useCallback(() => {
      deleteComment(comment.id);
  }, [deleteComment, comment.id]);

  const isOwnComment = currentUser?.email === comment.email;

  return (
    <article className={styles.commentCard}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <h4 className={styles.title}>{comment.name}</h4>
          <div className={styles.author}>
            <Mail size={14} />
            <span>{comment.email}</span>
          </div>
        </div>
        {(isAdmin() || isOwnComment) && (
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            title="Delete comment"
          >
            <Trash2 size={14} />
          </button>
        )}
      </header>
      
      <div className={styles.content}>
        <p>{comment.body}</p>
      </div>
    </article>
  );
});
import { memo, useCallback, useMemo } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Heart, ThumbsUp, ThumbsDown, Star, Trash2 } from "lucide-react";
import { ERoutes } from "@/shared/config/routes";
import { usePostActions } from "@/entities/post";
import { useUserStore } from "@/entities/user";
import { useSessionStore } from "@/features/session";
import { Button } from "@/shared/ui/Button";
import type { TPostWithInteractions } from "@/entities/post";
import styles from "./styles.module.css";
import clsx from "clsx";

interface PostCardProps {
  post: TPostWithInteractions;
}

export const PostCard = memo(({ post }: PostCardProps) => {
  const { toggleLike, toggleDislike, toggleFavorite, deletePost } = usePostActions();
  const navigate = useNavigate();
  const { users } = useUserStore();
  const { isAuthenticated, isAdmin } = useSessionStore();

  const author = useMemo(
    () => users.find((user) => user.id === post.userId),
    [users, post.userId]
  );

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isAuthenticated) {
        toggleLike(post.id);
      }
    },
    [isAuthenticated, toggleLike, post.id]
  );

  const handleDislike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isAuthenticated) {
        toggleDislike(post.id);
      }
    },
    [isAuthenticated, toggleDislike, post.id]
  );

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isAuthenticated) {
        toggleFavorite(post.id);
      }
    },
    [isAuthenticated, toggleFavorite, post.id]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isAdmin()) {
        deletePost(post.id);
      }
    },
    [isAdmin, deletePost, post.id]
  );

  const handleCardClick = () =>
    navigate(generatePath(ERoutes.POST, { id: post.id.toString() }));

  return (
    <article className={styles.postCard} onClick={handleCardClick}>
      <header className={styles.header}>
        <h3 className={styles.title}>{post.title}</h3>
        {author && (
          <div className={styles.author}>
            by {author.name} (@{author.username})
          </div>
        )}
      </header>

      <div className={styles.content}>
        <p className={styles.body}>{post.body}</p>
      </div>

      <footer className={styles.actions}>
        <div className={styles.postActions}>
          <Button
            className={clsx(styles.actionBtn, post.isLiked && styles.active)}
            onClick={handleLike}
            disabled={!isAuthenticated}
            variant="secondary"
            size="sm"
          >
            <ThumbsUp size={16} />
            <span>{post.likes}</span>
          </Button>

          <Button
            className={clsx(styles.actionBtn, post.isDisliked && styles.active)}
            onClick={handleDislike}
            disabled={!isAuthenticated}
            variant="secondary"
            size="sm"
          >
            <ThumbsDown size={16} />
            <span>{post.dislikes}</span>
          </Button>

          <Button
            className={clsx(
              styles.actionBtn,
              post.isFavorite && [styles.active, styles.favorite]
            )}
            onClick={handleFavorite}
            disabled={!isAuthenticated}
            variant="secondary"
            size="sm"
          >
            {post.isFavorite ? (
              <Heart size={16} fill="currentColor" />
            ) : (
              <Heart size={16} />
            )}
          </Button>

          {isAdmin() && (
            <Button
              className={clsx(styles.actionBtn, styles.danger)}
              onClick={handleDelete}
              variant="danger"
              size="sm"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>

        {!!post.priority && post.priority > 0 && (
          <div className={styles.priority}>
            <Star size={16} fill="currentColor" />
            <span>Priority: {post.priority}</span>
          </div>
        )}
      </footer>
    </article>
  );
});

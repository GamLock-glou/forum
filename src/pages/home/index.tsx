import { useMemo } from 'react';
import { FileText, Users, Loader, AlertCircle, Filter, Plus } from 'lucide-react';
import { usePostStore } from '@/entities/post';
import { PostCard } from '@/entities/post';
import { UserFilter } from '@/features/filters/UserFilter';
import { CreatePostForm } from '@/features/post-actions/CreatePostForm';
import styles from './styles.module.css';

export const HomePage = () => {
  const { getFilteredPosts, loading, error } = usePostStore();

  const filteredPosts = getFilteredPosts();

  const sortedPosts = useMemo(
    () => filteredPosts.sort((a, b) => (b.priority || 0) - (a.priority || 0)),
    [filteredPosts]
  );

  if (loading) {
    return (
      <div className={styles.homePage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <Loader size={48} />
          </div>
          <h2>Loading posts...</h2>
          <p>Please wait while we fetch the latest content</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.homePage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <AlertCircle size={64} />
          </div>
          <h1>Something went wrong</h1>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.homeContainer}>
        {/* Header */}
        <header className={styles.homeHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitle}>
              <FileText size={32} />
              <div>
                <h1>Forum Discussion</h1>
                <p>Share your thoughts and connect with the community</p>
              </div>
            </div>
            <div className={styles.headerStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{sortedPosts.length}</span>
                <span className={styles.statLabel}>Posts</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className={styles.homeContent}>
          {/* Actions Section */}
          <section className={styles.actionsSection}>
            <div className={styles.actionsHeader}>
              <div className={styles.actionsTitle}>
                <Plus size={20} />
                <h2>Create & Filter</h2>
              </div>
            </div>
            <div className={styles.actionsContent}>
              <div className={styles.createSection}>
                <CreatePostForm />
              </div>
              <div className={styles.filterSection}>
                <div className={styles.filterHeader}>
                  <Filter size={16} />
                  <span>Filter by Author</span>
                </div>
                <UserFilter />
              </div>
            </div>
          </section>

          {/* Posts Section */}
          <section className={styles.postsSection}>
            <div className={styles.postsHeader}>
              <div className={styles.postsTitle}>
                <Users size={24} />
                <h2>Latest Posts</h2>
                <span className={styles.postsCount}>({sortedPosts.length})</span>
              </div>
            </div>

            <div className={styles.postsContent}>
              {sortedPosts.length === 0 ? (
                <div className={styles.noPosts}>
                  <div className={styles.noPostsIcon}>
                    <FileText size={48} />
                  </div>
                  <h3>No posts found</h3>
                  <p>Be the first to create a post and start the conversation!</p>
                </div>
              ) : (
                <div className={styles.postsList}>
                  {sortedPosts.map(post => (
                    <div key={post.id} className={styles.postWrapper}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
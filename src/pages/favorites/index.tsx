import { Heart, Sparkles } from 'lucide-react';
import { usePostStore, PostCard } from '@/entities/post';
import styles from './styles.module.css';

export const FavoritesPage = () => {
  const { getFavoritePosts } = usePostStore();
  const favoritePosts = getFavoritePosts();

  const totalLikes = favoritePosts.reduce((sum, post) => sum + (post.likes || 0), 0);
  const mostLikedPost = favoritePosts.reduce((max, post) => 
    (post.likes || 0) > (max.likes || 0) ? post : max, 
    favoritePosts[0]
  );

  if (favoritePosts.length === 0) {
    return (
      <div className={styles.favoritesPage}>
        <div className={styles.favoritesEmpty}>
          <div className={styles.emptyIcon}>
            <Heart size={64} />
          </div>
          <h1>No Favorites Yet</h1>
          <p>Start exploring posts and add them to your favorites by clicking the heart icon!</p>
          <div className={styles.emptyDecoration}>
            <Sparkles size={24} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.favoritesContainer}>
        <header className={styles.favoritesHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitle}>
              <Heart size={32} className={styles.titleIcon} />
              <div>
                <h1>My Favorites</h1>
                <p>Your curated collection of favorite posts</p>
              </div>
            </div>
            <div className={styles.favoritesStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{favoritePosts.length}</span>
                <span className={styles.statLabel}>Favorite Posts</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{totalLikes}</span>
                <span className={styles.statLabel}>Total Likes</span>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.favoritesContent}>
          {mostLikedPost && (
            <section className={styles.featuredFavorite}>
              <div className={styles.featuredHeader}>
                <Sparkles size={20} />
                <h2>Most Liked Favorite</h2>
              </div>
              <div className={styles.featuredPost}>
                <PostCard post={mostLikedPost} />
              </div>
            </section>
          )}

          <section className={styles.favoritesList}>
            <div className={styles.sectionHeader}>
              <h2>All Favorites</h2>
              <div className={styles.listActions}>
                <span className={styles.postCount}>{favoritePosts.length} posts</span>
              </div>
            </div>
            
            <div className={styles.postsGrid}>
              {favoritePosts.map(post => (
                <div key={post.id} className={styles.postWrapper}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
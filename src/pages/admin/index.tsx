import { useState } from 'react';
import { Users, FileText, BarChart3, Shield, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { useSessionStore } from '@/features/session';
import { useUserStore } from '@/entities/user';
import { usePostStore } from '@/entities/post';
import { UserManagement } from '@/features/admin/UserManagement';
import { PostManagement } from '@/features/admin/PostManagement';
import styles from './styles.module.css';

type AdminTab = 'overview' | 'users' | 'posts';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const { isAdmin, currentUser } = useSessionStore();
  const { users } = useUserStore();
  const { posts } = usePostStore();

  if (!isAdmin()) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.accessDenied}>
          <div className={styles.deniedIcon}>
            <Shield size={64} />
            <AlertTriangle size={32} className={styles.warning} />
          </div>
          <h1>Access Denied</h1>
          <p>Administrator privileges are required to access this panel.</p>
          <p className={styles.helpText}>Contact an administrator if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  const adminUsers = users.filter(user => user.isAdmin).length;
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
  const totalDislikes = posts.reduce((sum, post) => sum + (post.dislikes || 0), 0);
  const priorityPosts = posts.filter(post => (post.priority || 0) > 0).length;

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminContainer}>
        <header className={styles.adminHeader}>
          <div className={styles.headerBackground}></div>
          <div className={styles.headerContent}>
            <div className={styles.adminTitle}>
              <div className={styles.titleIcon}>
                <Shield size={32} />
              </div>
              <div className={styles.titleText}>
                <h1>Administration Panel</h1>
                <p>Welcome back, <span className={styles.adminName}>{currentUser?.name}</span></p>
              </div>
            </div>
            <div className={styles.headerStats}>
              <div className={styles.quickStat}>
                <span className={styles.quickNumber}>{users.length}</span>
                <span className={styles.quickLabel}>Total Users</span>
              </div>
              <div className={styles.quickStat}>
                <span className={styles.quickNumber}>{posts.length}</span>
                <span className={styles.quickLabel}>Total Posts</span>
              </div>
            </div>
          </div>
        </header>

        <nav className={styles.adminTabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={16} />
            Overview
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} />
            Users ({users.length})
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <FileText size={16} />
            Posts ({posts.length})
          </button>
        </nav>

        <main className={styles.adminContent}>
          {activeTab === 'overview' && (
            <div className={styles.adminOverview}>
              <div className={styles.overviewHeader}>
                <h2>Dashboard Overview</h2>
                <div className={styles.overviewActions}>
                  <Activity size={20} />
                  <span>Real-time Statistics</span>
                </div>
              </div>
              
              <div className={styles.statsSection}>
                <div className={styles.statsGrid}>
                  <div className={`${styles.statCard} ${styles.users}`}>
                    <div className={styles.statIcon}>
                      <Users size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>{users.length}</div>
                      <div className={styles.statLabel}>Total Users</div>
                      <div className={styles.statDetail}>
                        <TrendingUp size={14} />
                        {adminUsers} administrators
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.posts}`}>
                    <div className={styles.statIcon}>
                      <FileText size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>{posts.length}</div>
                      <div className={styles.statLabel}>Total Posts</div>
                      <div className={styles.statDetail}>
                        <TrendingUp size={14} />
                        {priorityPosts} with priority
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.likes}`}>
                    <div className={styles.statIcon}>
                      <span className={styles.emoji}>👍</span>
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>{totalLikes}</div>
                      <div className={styles.statLabel}>Total Likes</div>
                      <div className={styles.statDetail}>
                        <TrendingUp size={14} />
                        {posts.length > 0 ? (totalLikes / posts.length).toFixed(1) : 0} avg per post
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.dislikes}`}>
                    <div className={styles.statIcon}>
                      <span className={styles.emoji}>👎</span>
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>{totalDislikes}</div>
                      <div className={styles.statLabel}>Total Dislikes</div>
                      <div className={styles.statDetail}>
                        <TrendingUp size={14} />
                        {posts.length > 0 ? (totalDislikes / posts.length).toFixed(1) : 0} avg per post
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.activitySection}>
                <div className={styles.activityHeader}>
                  <h3>Recent Activity</h3>
                  <div className={styles.activityBadge}>
                    <Activity size={16} />
                    Latest Posts
                  </div>
                </div>
                <div className={styles.activityContainer}>
                  {posts
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 6)
                    .map(post => {
                      const author = users.find(user => user.id === post.userId);
                      return (
                        <div key={post.id} className={styles.activityItem}>
                          <div className={styles.activityAvatar}>
                            {author?.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className={styles.activityInfo}>
                            <div className={styles.activityTitle}>{post.title}</div>
                            <div className={styles.activityMeta}>
                              by <span className={styles.activityAuthor}>{author?.name || 'Unknown'}</span>
                              <span className={styles.activityId}>#{post.id}</span>
                            </div>
                          </div>
                          <div className={styles.activityStats}>
                            <div className={`${styles.activityStat} ${styles.positive}`}>
                              <span>{post.likes}</span>
                              <span>👍</span>
                            </div>
                            <div className={`${styles.activityStat} ${styles.negative}`}>
                              <span>{post.dislikes}</span>
                              <span>👎</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className={styles.managementSection}>
              <UserManagement />
            </div>
          )}
          
          {activeTab === 'posts' && (
            <div className={styles.managementSection}>
              <PostManagement />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
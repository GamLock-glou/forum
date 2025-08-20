import { Link } from "react-router-dom";
import { Settings, Users, Heart, Mail, Phone, Globe, MapPin, Building, Award } from "lucide-react";
import { useSessionStore } from "@/features/session";
import { usePostStore } from "@/entities/post";
import { EditProfileForm } from "@/features/auth/EditProfileForm";
import { ERoutes } from "@/shared/config/routes";
import styles from './styles.module.css';

export const ProfilePage = () => {
  const { currentUser, isAdmin } = useSessionStore();
  const { posts, getFavoritePosts } = usePostStore();

  if (!currentUser) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.notAuthenticated}>
          <div className={styles.authIcon}>
            <Settings size={64} />
          </div>
          <h1>Please log in to view profile</h1>
          <p>You need to be logged in to access your profile and manage your settings.</p>
        </div>
      </div>
    );
  }

  const userPosts = posts.filter((post) => post.userId === currentUser.id);
  const favoritePosts = getFavoritePosts();

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.headerBackground}></div>
          <div className={styles.headerContent}>
            <div className={styles.profileAvatar}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarPlaceholder}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                {currentUser.isAdmin && (
                  <div className={styles.adminCrown}>
                    <Award size={16} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h1>{currentUser.name}</h1>
              <p className={styles.username}>@{currentUser.username}</p>
              {currentUser.isAdmin && (
                <span className={styles.adminBadge}>
                  <Award size={14} />
                  Administrator
                </span>
              )}
            </div>
            <div className={styles.profileActions}>
              <EditProfileForm user={currentUser} />
            </div>
          </div>
        </header>

        <div className={styles.profileContent}>
          <div className={styles.statsSection}>
            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} ${styles.posts}`}>
                <div className={styles.statIcon}>📝</div>
                <div className={styles.statNumber}>{userPosts.length}</div>
                <div className={styles.statLabel}>Posts</div>
              </div>
              <div className={`${styles.statCard} ${styles.favorites}`}>
                <div className={styles.statIcon}>💖</div>
                <div className={styles.statNumber}>{favoritePosts.length}</div>
                <div className={styles.statLabel}>Favorites</div>
              </div>
              <div className={`${styles.statCard} ${styles.likes}`}>
                <div className={styles.statIcon}>👍</div>
                <div className={styles.statNumber}>
                  {userPosts.reduce((sum, post) => sum + (post.likes || 0), 0)}
                </div>
                <div className={styles.statLabel}>Total Likes</div>
              </div>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <section className={`${styles.detailCard} ${styles.contact}`}>
              <div className={styles.cardHeader}>
                <Mail size={20} />
                <h3>Contact Information</h3>
              </div>
              <div className={styles.detailList}>
                <div className={styles.detailItem}>
                  <Mail size={16} />
                  <span className={styles.detailLabel}>Email:</span>
                  <span className={styles.detailValue}>{currentUser.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <Phone size={16} />
                  <span className={styles.detailLabel}>Phone:</span>
                  <span className={styles.detailValue}>{currentUser.phone}</span>
                </div>
                <div className={styles.detailItem}>
                  <Globe size={16} />
                  <span className={styles.detailLabel}>Website:</span>
                  <span className={styles.detailValue}>
                    <a
                      href={`https://${currentUser.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.websiteLink}
                    >
                      {currentUser.website}
                    </a>
                  </span>
                </div>
              </div>
            </section>

            {currentUser.address && (
              <section className={`${styles.detailCard} ${styles.address}`}>
                <div className={styles.cardHeader}>
                  <MapPin size={20} />
                  <h3>Address</h3>
                </div>
                <div className={styles.addressInfo}>
                  <p className={styles.street}>
                    {currentUser.address.street}, {currentUser.address.suite}
                  </p>
                  <p className={styles.city}>
                    {currentUser.address.city} {currentUser.address.zipcode}
                  </p>
                </div>
              </section>
            )}

            {currentUser.company && (
              <section className={`${styles.detailCard} ${styles.company}`}>
                <div className={styles.cardHeader}>
                  <Building size={20} />
                  <h3>Company</h3>
                </div>
                <div className={styles.companyInfo}>
                  <h4 className={styles.companyName}>{currentUser.company.name}</h4>
                  <p className={styles.catchphrase}>
                    "{currentUser.company.catchPhrase}"
                  </p>
                  <p className={styles.business}>{currentUser.company.bs}</p>
                </div>
              </section>
            )}
          </div>

          <div className={styles.navigationSection}>
            <h3>Quick Actions</h3>
            <div className={styles.navGrid}>
              <Link to={ERoutes.FAVORITES} className={`${styles.navCard} ${styles.navFavorites}`}>
                <div className={styles.navIcon}>
                  <Heart size={24} />
                </div>
                <div className={styles.navContent}>
                  <span className={styles.navTitle}>View Favorites</span>
                  <span className={styles.navSubtitle}>Your favorite posts</span>
                </div>
                <div className={styles.navCount}>{favoritePosts.length}</div>
              </Link>

              {isAdmin() && (
                <Link to={ERoutes.ADMIN} className={`${styles.navCard} ${styles.navAdmin}`}>
                  <div className={styles.navIcon}>
                    <Users size={24} />
                  </div>
                  <div className={styles.navContent}>
                    <span className={styles.navTitle}>Admin Panel</span>
                    <span className={styles.navSubtitle}>Manage users & posts</span>
                  </div>
                  <div className={styles.navBadge}>
                    <Settings size={16} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

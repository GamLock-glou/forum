import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { PostPage } from "@/pages/post";
import { ProfilePage } from "@/pages/profile";
import { AdminPage } from "@/pages/admin";
import { FavoritesPage } from "@/pages/favorites";
import { ERoutes as AppRoutes } from "@/shared/config/routes";
import { useSessionStore } from "@/features/session";
import { Button } from "@/shared/ui/Button";
import { LoginModal } from "@/features/auth/LoginModal";
import styles from "./styles/App.module.css";
import "./styles/main.css";
import { PreloadQueriesLayout } from "./layout/PreloadQueriesLayout";

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, currentUser, isAdmin, logout } = useSessionStore();

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <PreloadQueriesLayout>
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <nav className={styles.navigation}>
              <Link to={AppRoutes.HOME} className={styles.navLink}>
                Home
              </Link>
              <Link to={AppRoutes.FAVORITES} className={styles.navLink}>
                Favorites
              </Link>
              {isAuthenticated && (
                <>
                  <Link to={AppRoutes.PROFILE} className={styles.navLink}>
                    Profile
                  </Link>
                  {isAdmin() && (
                    <Link to={AppRoutes.ADMIN} className={styles.navLink}>
                      Admin
                    </Link>
                  )}
                </>
              )}
            </nav>

            <div className={styles.authSection}>
              {isAuthenticated ? (
                <div className={styles.userInfo}>
                  <span>Hello, {currentUser?.name}</span>
                  <Button onClick={logout} variant="secondary" size="sm">
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={handleOpenLogin} variant="primary" size="sm">
                  Login
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route path={AppRoutes.HOME} element={<HomePage />} />
            <Route path={AppRoutes.POST} element={<PostPage />} />
            <Route path={AppRoutes.PROFILE} element={<ProfilePage />} />
            <Route path={AppRoutes.ADMIN} element={<AdminPage />} />
            <Route path={AppRoutes.FAVORITES} element={<FavoritesPage />} />
          </Routes>
        </main>

        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLogin} />
      </div>
    </PreloadQueriesLayout>
  );
}

import { Loader } from 'lucide-react';
import styles from './styles.module.css';

export const PageLoader = () => {
  return (
    <div className={styles.pageLoader}>
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}>
          <Loader size={48} />
        </div>
        <h2>Loading...</h2>
        <p>Please wait while we load the page content</p>
      </div>
    </div>
  );
};
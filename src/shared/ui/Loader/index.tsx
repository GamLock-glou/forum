import { MessageCircle } from "lucide-react";
import styles from './styles.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.forumIcon}>
          <MessageCircle size={32} />
        </div>
        <div className={styles.dots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.text}>Loading forum...</div>
      </div>
    </div>
  );
};

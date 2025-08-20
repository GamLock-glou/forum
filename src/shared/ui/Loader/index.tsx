import { Loader as LoaderIcon } from "lucide-react";
import styles from './styles.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingSpinner}>
        <LoaderIcon size={48} />
      </div>
    </div>
  );
};

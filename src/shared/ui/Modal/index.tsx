import { memo, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "../Button";
import styles from "./styles.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
}

export const Modal = memo(
  ({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    showCloseButton = true,
  }: ModalProps) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalContent = (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={`${styles.modalContent} ${styles[size]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <header className={styles.modalHeader}>
              {title && <h2 className={styles.modalTitle}>{title}</h2>}
              {showCloseButton && (
                <Button
                  onClick={onClose}
                  variant="secondary"
                  size="sm"
                  className={styles.closeButton}
                >
                  <X size={16} />
                </Button>
              )}
            </header>
          )}

          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

import { memo, useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './styles.module.css';

export interface SelectOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Select = memo(({
  options,
  value,
  placeholder = "Select an option",
  onChange,
  disabled = false,
  error,
  label,
  size = 'md'
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  return (
    <div className={styles.selectWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      
      <div 
        ref={selectRef}
        className={`${styles.select} ${styles[size]} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''} ${isOpen ? styles.open : ''}`}
      >
        <div
          className={styles.selectTrigger}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className={styles.selectValue}>
            {selectedOption ? (
              <div className={styles.selectedOption}>
                {selectedOption.icon && (
                  <span className={styles.optionIcon}>
                    {selectedOption.icon}
                  </span>
                )}
                <div className={styles.optionContent}>
                  <span className={styles.optionLabel}>{selectedOption.label}</span>
                  {selectedOption.description && (
                    <span className={styles.optionDescription}>
                      {selectedOption.description}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </div>
          <ChevronDown 
            size={16} 
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          />
        </div>

        {isOpen && (
          <div className={styles.selectOptions} role="listbox">
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${option.disabled ? styles.optionDisabled : ''} ${option.value === value ? styles.optionSelected : ''}`}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                role="option"
                aria-selected={option.value === value}
              >
                <div className={styles.optionContent}>
                  {option.icon && (
                    <span className={styles.optionIcon}>
                      {option.icon}
                    </span>
                  )}
                  <div className={styles.optionText}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {option.description && (
                      <span className={styles.optionDescription}>
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
                {option.value === value && (
                  <Check size={16} className={styles.checkIcon} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
});
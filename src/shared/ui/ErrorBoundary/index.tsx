import { Component, type ReactNode } from 'react';
import { AlertCircle, Home } from '@/shared/ui/icons';
import { RefreshCw } from 'lucide-react';
import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>
              <AlertCircle size={64} />
            </div>
            <h1>Something went wrong</h1>
            <p>We're sorry, but something unexpected happened.</p>
            
            {this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error details</summary>
                <pre className={styles.errorMessage}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
            
            <div className={styles.errorActions}>
              <button 
                onClick={this.handleRetry}
                className={styles.retryButton}
              >
                <RefreshCw size={16} />
                Try Again
              </button>
              <button 
                onClick={this.handleGoHome}
                className={styles.homeButton}
              >
                <Home size={16} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
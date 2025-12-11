import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops! Something went wrong</h1>
          <p>We encountered an unexpected error. Please refresh the page to try again.</p>
          <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
            <summary>Error details</summary>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}
            className="control-btn"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

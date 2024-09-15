import React, {Component, ErrorInfo, ReactNode} from 'react';
import {ErrorDetails} from './ErrorDetail';

interface Props {
  children: ReactNode;
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state = {error: null, errorInfo: null};

  // If an error in a child is encountered, this will run
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only set errors if enabled
    if (!this.isEnabled()) {
      return;
    }
    this.setState({
      error,
      errorInfo,
    });
  }

  // Reset the error back to null
  resetError = () => {
    this.setState({error: null, errorInfo: null});
  };

  // To avoid unnecessary re-renders
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
    return nextState.error !== this.state.error;
  }

  // Only enable if we're catching errors in the right environment
  isEnabled(): boolean {
    return (
      this.props.catchErrors === 'always' ||
      (this.props.catchErrors === 'dev' && __DEV__) ||
      (this.props.catchErrors === 'prod' && !__DEV__)
    );
  }

  // Render an error UI if there's an error; otherwise, render children
  render() {
    return this.isEnabled() && this.state.error ? (
      <ErrorDetails onReset={this.resetError} error={this.state.error} errorInfo={this.state.errorInfo} />
    ) : (
      this.props.children
    );
  }
}

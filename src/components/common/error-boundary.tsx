import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * @description
 * Catches errors anywhere in its child component tree, logs those errors, 
 * and displays a fallback UI instead of the component tree that crashed.
 * 
 * @example
 * <ErrorBoundary>
 *  <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div>
        <h1> Sorry.. there was an error</h1>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
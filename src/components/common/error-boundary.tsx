import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
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
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div className="flex flex-col justify-center items-center h-screen">
        <h1> Sorry.. there was an error</h1>
        <pre className="bg-slate-200 p-2 rounded-md overflow-auto">
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

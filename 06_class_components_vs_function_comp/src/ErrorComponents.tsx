import React, { ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logErrorToMyService(
      error,
      info.componentStack || "",
      // Warning: `captureOwnerStack` is not available in production.
      React?.captureOwnerStack() || ""
    );
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

function logErrorToMyService(
  error: Error,
  componentStack: string,
  ownerStack: string
) {
  console.log(error, componentStack, ownerStack);
}

import { Component } from 'react';
import { NextRouter, withRouter } from 'next/router';
interface ErrorBoundaryProps {
  children: React.ReactNode;
  router: NextRouter;
}

class Boundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    console.error(error, 'ErrorBoundary getDerivedStateFromError');
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: unknown) {
    // You can use your own error logging service here
    console.error({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type='button'
            onClick={() => {
              this.props.router.reload();
              this.setState({ hasError: false });
            }}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export const ErrorBoundary = withRouter(Boundary);

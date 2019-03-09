import React from 'react';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true,error };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        //   logErrorToMyService(error, info);
        console.log('error', error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>
                <h2>Something went wrong.</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                </details>
            </div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
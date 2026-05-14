import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center px-6 text-center">
          <div className="glass max-w-lg rounded-[2rem] p-8">
            <h1 className="text-3xl font-black">Something snapped.</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Refresh the page and Lumina will pick the thread back up.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

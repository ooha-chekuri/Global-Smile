"use client";

import { Component, type ReactNode } from "react";
import { WarningCircle } from "@phosphor-icons/react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <WarningCircle
              size={40}
              className="text-amber-500 mb-3"
              weight="bold"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Something went wrong
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              This section encountered an unexpected error.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

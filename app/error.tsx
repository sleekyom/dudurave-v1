"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-amber-500">
          Something went wrong
        </h1>
        <p className="text-xl text-gray-300">
          We're sorry, but there was an error. Please try again later.
        </p>
        <div className="space-y-4 pt-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-amber-500 text-black font-medium rounded-md hover:bg-amber-400 transition-colors"
          >
            Try again
          </button>
          <div className="pt-2">
            <Link
              href="/"
              className="text-amber-500 hover:underline"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

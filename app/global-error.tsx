"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white p-4">
          <div className="text-center space-y-6 max-w-md">
            <h1 className="text-4xl font-bold text-amber-500">
              Something went wrong
            </h1>
            <p className="text-xl text-gray-300">
              We're sorry, but there was an error. Please try again later.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-amber-500 text-black font-medium rounded-md hover:bg-amber-400 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

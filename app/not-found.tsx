import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-amber-500">Page Not Found</h1>
        <p className="text-xl text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="px-6 py-3 bg-amber-500 text-black font-medium rounded-md hover:bg-amber-400 transition-colors inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import React from "react";

export default function NotFound(): React.ReactElement {
  return (
    <div className="h-[400px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md">
        <h1 className="text-6xl font-extrabold text-indigo-600 drop-shadow-sm mb-4">
          404
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition-all">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

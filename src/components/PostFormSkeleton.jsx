import React from "react";

export default function PostFormSkeleton() {
  return (
    <div className="flex flex-wrap animate-pulse mt-0 p-4   ">
      {/* Left Column */}
      <div className="w-full mt-0 md:w-2/3 px-2 space-y-6  ">
        {/* Title */}
        <div className="mt-0">
          <div className="h-4 bg-gray-300 rounded-sm w-24 mb-2 mx-auto shadow-xl shadow-gray-600" />
          <div className="h-10 bg-gray-200 rounded-lg shadow-xl shadow-gray-600 w-full" />
        </div>

        {/* Slug */}
        <div>
          <div className="h-4 bg-gray-300 rounded-sm shadow-xl shadow-gray-600 w-36 mb-2 mx-auto" />
          <div className="h-10 bg-gray-200 rounded-lg shadow-xl shadow-gray-600 w-full" />
        </div>

        {/* Rich Text Editor */}
        <div>
          <div className="h-4 bg-gray-300 rounded-sm shadow-xl shadow-gray-600 w-32 mb-2 mx-auto" />
          <div className="h-98 bg-gray-200 rounded-lg shadow-xl shadow-gray-600 w-full" />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/3 px-2 mt-8 md:mt-0 space-y-6">
        {/* Featured Image Input */}
        <div>
          <div className="h-4 bg-gray-300 rounded-sm shadow-xl shadow-gray-600 w-40 mb-2 mx-auto" />
          <div className="h-10 bg-gray-200 rounded-lg shadow-xl shadow-gray-600 w-full" />
        </div>

        {/* Current Image Preview Placeholder */}

        {/* Status Select */}
        <div>
          <div className="h-4 bg-gray-300 rounded-sm shadow-xl shadow-gray-600 w-20 mb-2 mx-auto" />
          <div className="h-10 bg-gray-200 rounded-lg shadow-xl shadow-gray-600 w-full" />
        </div>

        {/* Submit Button */}
        <div>
          <div className="h-10 bg-blue-500 rounded-lg shadow-xl shadow-gray-600 w-full" />
        </div>
      </div>
    </div>
  );
}

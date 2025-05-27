import React from "react";

export default function PostFormSkeleton() {
  return (
    <div className="flex flex-wrap animate-pulse p-6 md:p-10  rounded-xl shadow-md">
      {/* Left Column */}
      <div className="w-full md:w-2/3 px-2 space-y-6">
        {/* Title */}
        <div >
          <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>

        {/* Slug */}
        <div>
          <div className="h-4 bg-gray-300 rounded w-36 mb-2" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>

        {/* Rich Text Editor */}
        <div>
          <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
          <div className="h-48 bg-gray-200 rounded w-full" />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/3 px-2 mt-8 md:mt-0 space-y-6">
        {/* Featured Image Input */}
        <div>
          <div className="h-4 bg-gray-300 rounded w-40 mb-2" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>

        {/* Current Image Preview Placeholder */}
        <div>
          <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
          <div className="h-40 bg-gray-200 rounded w-full object-contain" />
        </div>

        {/* Status Select */}
        <div>
          <div className="h-4 bg-gray-300 rounded w-20 mb-2" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>

        {/* Submit Button */}
        <div>
          <div className="h-12 bg-blue-500 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

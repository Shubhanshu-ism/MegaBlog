import React from "react";
import { Container } from "../components";

export default function PostSkeleton() {
  return (
    <div className="py-8 animate-pulse">
      <Container>
        {/* Edit/Delete buttons placeholder */}
        <div className="flex justify-end space-x-3  shadow-xl items-center m-4 ">
          <div className="h-10 w-20 bg-gray-300 rounded" />
          <div className="h-10 w-20 bg-gray-300 rounded" />
        </div>

        {/* Featured Image Placeholder */}
        <div className="w-full flex justify-center mb-6 relative rounded-xl p-2 bg-white shadow-md">
          <div className="h-8 w-full bg-gray-300 rounded mx-auto" />
          {/* <div className="max-h-96 w-full bg-gray-200 rounded-xl" /> */}
        </div>

        {/* Title Placeholder */}
        <div className="w-full mb-6 p-4 bg-white rounded-xl shadow-md text-center">
          <div className="h-8 w-full bg-gray-300 rounded mx-auto" />
        </div>

        {/* Post Content Placeholder */}
        <div className="p-6 bg-white rounded-xl shadow-md text-gray-700 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          
        </div>
      </Container>
    </div>
  );
}

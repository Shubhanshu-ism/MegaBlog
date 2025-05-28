import React from "react";
import { ShimmerPost } from "./ShimmerPost";
import Container from "../container/Container";

function Loading() {
  return (
    <div className="w-full py-5  ">
      <main className="flex flex-wrap ">
        <Container>
          <div className="py-8  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ShimmerPost.map((post) => (
              <div key={post.id} className="w-full ">
                <div className="bg-white rounded-xl p-4 shadow-lg shadow-gray-600 animate-pulse h-full flex flex-col">
                  <div className="w-full justify-center mb-4 h-44 bg-gray-300 rounded-md"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}

export default Loading;

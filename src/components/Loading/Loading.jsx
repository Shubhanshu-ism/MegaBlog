import React from "react";
import { ShimmerPosr } from "./ShimmerPost"; // Assuming this is an array of dummy post data
import Header from "../Header/Header"; // Assuming you want to include these in the loading state
import Footer from "../Footer/Footer"; // Assuming you want to include these in the loading state
import Container from "../container/Container";

function Loading() {
  return (
    <div className="w-full py-5 ">
      {" "}
      {/* Changed to flex-col for better layout control */}
      {/* You might want to include a skeleton Header here if your actual header has a loading state */}
      {/* <Header /> */}
      <main className="flex flex-wrap">
        {" "}
        {/* Allows content to push footer to the bottom */}
        <Container>
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {" "}
            {/* Using CSS Grid for better responsiveness */}
            {ShimmerPosr.map((post) => (
              <div key={post.id} className="w-full">
                <div className="bg-white rounded-xl p-4 shadow-lg animate-pulse h-full flex flex-col">
                  {/* Image Shimmer */}
                  <div className="w-full justify-center mb-4 h-44 bg-gray-300 rounded-md">
                    {/* This div acts as the shimmering placeholder for the image */}
                  </div>
                  {/* Title Shimmer */}
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>{" "}
                  {/* Shimmer for the title */}
                  {/* Additional content shimmer (e.g., for a short description or meta-info) */}
                  {/* <div className="h-4 bg-gray-300 rounded w-1/2"></div> */}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
      {/* You might want to include a skeleton Footer here if your actual footer has a loading state */}
      <Footer />
    </div>
  );
}

export default Loading;

import React from "react";
import appwriteService from "../appwrite/config"; // Correct path assuming PostCard.jsx is in components/
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // $id is the document ID (slug)
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 h-full flex flex-col items-center ">
        {imageUrl && (
          <div className="w-full justify-center mb-4 h-40 overflow-hidden rounded-md">
            <img
              src={imageUrl}
              alt={title}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
        )}
        {!imageUrl && (
          <div className="w-full justify-center mb-4 h-40 flex items-center bg-gray-200 rounded-md">
            <p className="text-gray-500 text-sm">No image</p>
          </div>
        )}
        <h2 className="text-xl items-center font-bold text-gray-800 mt-auto">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;

import React from "react";
import appwriteService from "../appwrite/config"; // Correct path assuming PostCard.jsx is in components/
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, status = "active" }) {
  // $id is the document ID (slug)
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null;

  return (
    <Link to={`/post/${$id}`}>
      <div
        className={`w-full ${
          status === "active" ? "bg-white" : "bg-neutral-400"
        }  rounded-xl p-4 shadow-lg shadow-gray-600 hover:shadow-md transition-shadow duration-200 h-full flex flex-col items-center`}
      >
        {status !== "active" && <p className="m-1 font-bold">Inactive</p> } 
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
        {/* <p className="text-sm mt-1">{status}</p> */}
      </div>
    </Link>
  );
}

export default PostCard;

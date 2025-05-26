import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components"; // Assuming components/index.js
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { slug } = useParams(); // slug here is the document ID
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    setLoading(true);
    setError("");
    if (slug && slug !== "undefined") {
      // Ensure slug is valid
      appwriteService
        .getPost(slug)
        .then((retrievedPost) => {
          if (retrievedPost) {
            setPost(retrievedPost);
          } else {
            setError(
              `Post with ID '${slug}' not found or could not be retrieved.`
            );
            // navigate("/"); // Consider navigating or showing a "not found" message
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(`Error fetching post: ${err.message}`);
          setLoading(false);
        });
    } else {
      setError("Invalid post identifier.");
      setLoading(false);
      // navigate("/"); // Navigate if slug is truly invalid like "undefined"
    }
  }, [slug, navigate]);

  const deletePostHandler = () => {
    if (!post || !post.$id) {
      setError("Cannot delete post: Post data is missing.");
      return;
    }

    appwriteService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
          // If post has a featured image, try to delete it
          if (post.featuredImage) {
            appwriteService
              .deleteFile(post.featuredImage)
              .catch((err) =>
                console.warn(
                  "Post.jsx: Failed to delete featured image during post deletion:",
                  err.message
                )
              );
          }
          navigate("/"); // Navigate to home or all posts after deletion
        } else {
          setError("Failed to delete the post. Please try again.");
        }
      })
      .catch((err) => {
        setError(`Error deleting post: ${err.message}`);
      });
  };

  if (loading) {
    return (
      <div className="py-8">
        <Container>
          <p className="text-center text-xl">Loading post...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <Container>
          <p className="text-center text-red-500 text-xl">{error}</p>
          <div className="text-center mt-4">
            <Button onClick={() => navigate("/")} bgColor="bg-blue-500">
              Go to Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    // Should be covered by error state, but as a fallback
    return (
      <div className="py-8">
        <Container>
          <p className="text-center text-xl">Post not found.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-100">
      <Container>
        {post.featuredImage && (
          <div className="w-full flex justify-center mb-6 relative border rounded-xl p-2 bg-white shadow-md">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-h-96 object-contain" // Constrain image size
            />
          </div>
        )}

        <div className="w-full mb-6 p-4 bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            {isAuthor && (
              <div className="flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="hover:bg-green-600">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  onClick={deletePostHandler}
                  className="hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="browser-css p-6 bg-white rounded-xl shadow-md text-gray-700 leading-relaxed">
          {/* Ensure post.content is a string and parse it */}
          {parse(String(post.content || ""))}
        </div>
      </Container>
    </div>
  );
}

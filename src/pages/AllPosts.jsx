import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import Loading from "../components/Loading/Loading";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Added a loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Optionally handle error state here, e.g., display an error message
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchPosts(); // Call the async function
  }, []); // Empty dependency array means this effect runs only once after the initial render

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p>No posts available.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

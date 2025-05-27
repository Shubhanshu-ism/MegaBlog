import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  // const isAuthor = post && userData ? post.userId === userData.$id : false;


  useEffect(() => {
    if (userData && userData.$id) {
      appwriteService.getMyPosts(userData.$id).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    }
  }, [userData]);

  if (posts.length === 0) {
    return (
      <Loading/>
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

export default Home;

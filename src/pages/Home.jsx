import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  if (!userData){
    return (
      <div className="w-full p-8  space-y-8">
        <h1 className="text-2xl p-5 font-bold bg-gray-100 shadow-2xl rounded-xl shadow-gray-600">
          Please Log in to continue
        </h1>
        <div className=" flex flex-wrap justify-center font-bold ">
          <div className=" p-4 m-5 ">
            <p>Don't have an account?</p>
            <button
              className="inline-block px-6 py-2 m-4 cursor-pointer shadow-lg hover:shadow-md shadow-gray-600 duration-200 bg-gray-200 hover:bg-blue-100 rounded-2xl "
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>

          <div className=" p-4 m-5">
            <p>If you already have an account</p>
            <button
              className="inline-block px-6 py-2 m-4 cursor-pointer shadow-lg shadow-gray-600 hover:shadow-md duration-200 bg-gray-200 hover:bg-blue-100 rounded-2xl "
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
  
    if (posts.length === 0) {
      return <Loading />;
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

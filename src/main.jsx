import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import components and pages
import { AuthLayout } from "./components/index.js"; // Assuming index.js is in components/
import LoginPage from "./pages/Login.jsx"; // Renamed to avoid conflict with component
import SignupPage from "./pages/Signup.jsx"; // Renamed
import {
  AddPost,
  AllPosts,
  Post, // This is pages/Post.jsx
  EditPost,
  Home,
} from "./pages/index.js"; // Assuming index.js is in pages/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            {/* Requires login */}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            {/* Requires login */}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug", // slug is the document ID
        element: (
          <AuthLayout authentication>
            {" "}
            {/* Requires login */}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug", // slug is the document ID
        element: <Post />, // Individual posts are often public, so AuthLayout might not be needed
        // If posts require login to view, wrap with <AuthLayout authentication>
      },
      // Consider adding a 404 Not Found page
      // {
      //   path: "*",
      //   element: <div><h1>404 - Page Not Found</h1><Link to="/">Go Home</Link></div>,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

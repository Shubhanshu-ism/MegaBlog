import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login, AuthLayout } from "./components/index.js";
import {
  AddPost,
  AllPosts,
  Post,
  Signup,
  EditPost,
  Home,
} from "./pages/index.js";

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
        // This seems to be for login, but its path is /about.
        // If it's a login page, a more descriptive path might be /login.
        path: "/login", // Changed from /about to /login for clarity, assuming it's a login page
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug", // For editing a specific post
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        // THIS IS THE MISSING/CORRECTED ROUTE for displaying a single post
        path: "/post/:slug", // This path now correctly matches "/post/test-5"
        element: (
          // <AuthLayout authentication>
            // {" "}
            // {/* Assuming a post page requires authentication to view */}
            <Post />
          // </AuthLayout>
        ),
      },
      // You might want a catch-all 404 page for any unhandled routes
      // {
      //   path: "*",
      //   element: <div>404 Not Found</div>,
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

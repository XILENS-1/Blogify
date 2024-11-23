import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import BlogDetailPage from "./pages/BlogDetailPage.jsx";
import { Provider } from "react-redux";
import store from "./store/app.js";
import AddPostPage from "./pages/AddPostPage.jsx";
import AllPostPage from "./pages/AllPostPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import EditBlogPage from "./pages/EditBlogPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/details/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "/add-post",
        element: (
          <PrivateRoute>
            <AddPostPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-post",
        element: (
          <PrivateRoute>
            <AllPostPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <EditBlogPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

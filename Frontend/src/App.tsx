import {
  ActionFunction,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Root from "./root/Root";
import Home from "./components/Home";
import AboutMe from "./components/About-me";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { action as manipulateBlogAction } from "./components/BlogForm";
import EditBlog from "./components/EditBlog";
import {
  loader as blogDetailLoader,
  action as deleteBlogAction,
} from "./components/BlogDetail";
import Login from "./components/Login";
import Signup from "./components/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "blog",
          children: [
            { path: "", element: <BlogList /> },
            {
              path: ":blogId",
              id: "blog-detail",
              loader: blogDetailLoader,
              children: [
                {
                  index: true,
                  element: <BlogDetail />,
                  action: deleteBlogAction as ActionFunction,
                },
                {
                  path: "edit",
                  element: <EditBlog />,
                  action: manipulateBlogAction as ActionFunction,
                },
              ],
            },
            {
              path: "new",
              element: <AddBlog />,
              action: manipulateBlogAction as ActionFunction,
            },
          ],
        },
        { path: "about-me", element: <AboutMe /> },
      ],
    },
    { path: "/sign-up", element: <Signup /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { useRouteLoaderData } from "react-router-dom";
import BlogForm from "./BlogForm";

function EditBlog() {
  const data: any = useRouteLoaderData("blog-detail");
  return <BlogForm method="patch" blog={data.blog} />;
}

export default EditBlog;

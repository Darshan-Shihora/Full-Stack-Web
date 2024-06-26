import {
  ActionFunction,
  Await,
  defer,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import BlogItem from "./BlogItem";
import { Suspense } from "react";
import axios from "axios";
import { getCookie } from "./Login";

function BlogDetail() {
  const blog: any = useRouteLoaderData("blog-detail");
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={blog}>
        {(loadedBlog) => <BlogItem blog={loadedBlog} />}
      </Await>
    </Suspense>
  );
}

export default BlogDetail;

async function loadEvent(id: string) {
  // const token = localStorage.getItem("Token");
  const token = getCookie("Token")
  try {
    const response = await axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `http://localhost:3001/blog/${id}`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw redirect("../../login");
  }
}

export const loader = async ({ params }: { params: any }) => {
  const id = params.blogId;

  return defer({
    blog: await loadEvent(id),
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const blogId = params.blogId;
  const url = `http://localhost:3001/blog/${blogId}`;
  const method = request.method;
  // const token = localStorage.getItem("Token");
  const token = getCookie("Token");
  try {
    await axios({
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: method,
    });
    return redirect("..");
  } catch (error) {
    console.log("Can't delete the blog");
    throw error;
  }
};

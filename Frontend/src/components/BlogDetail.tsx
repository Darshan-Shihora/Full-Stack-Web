import {
  ActionFunction,
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import BlogItem from "./BlogItem";
import { Suspense } from "react";
import axios from "axios";

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
  const response = await axios.get(`http://localhost:3001/blog/${id}`);
  return response.data.data;
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

  const response = await axios({
    url: url,
    method: method,
  });

  if (response.status !== 200) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/blog");
};

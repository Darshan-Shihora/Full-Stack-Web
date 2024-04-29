import { useEffect, useState } from "react";
import Blog from "./Blog";
import { NavLink } from "react-router-dom";
import axios from "axios";

type Blogs = {
  blog_id: string;
  image: string;
  title: string;
  date: string;
};
// const BLOGS: Blogs[] = [
//   {
//     id: "the-girl-from-ipanema",
//     image:
//       "https://static.wixstatic.com/media/ae5901bd4fda41009c4cc4a19bb70d05.jpg/v1/fill/w_1175,h_661,fp_0.50_0.50,q_90,enc_auto/ae5901bd4fda41009c4cc4a19bb70d05.jpg",
//     title: "The Girl from Ipanema",
//   },
//   {
//     id: "the-mexico-diary-day1-oaxaca",
//     image:
//       "https://static.wixstatic.com/media/f969ea5e4ea64a66af55f3cb06895101.jpg/v1/fill/w_1175,h_661,fp_0.50_0.50,q_90,enc_auto/f969ea5e4ea64a66af55f3cb06895101.jpg",
//     title: "The Mexico Diary, Day 1: Oaxaca",
//   },
//   {
//     id: "mykonos-with-mr-mrs-smith",
//     image:
//       "https://static.wixstatic.com/media/e3190f8f39f5445c8e5d4153ab1414aa.jpg/v1/fill/w_1175,h_661,fp_0.50_0.50,q_90,enc_auto/e3190f8f39f5445c8e5d4153ab1414aa.jpg",
//     title: "Mykonos with Mr. & Mrs. Smith",
//   },
// ];

function BlogList() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // const isUserLoggedIn = () => {
  //   const token = localStorage.getItem("Token");
  //   if (token !== null) {
  //     console.log(token);
  //     setIsLoggedIn(true);
  //     console.log(isLoggedIn);
  //   } else {
  //     console.log(token);
  //     setIsLoggedIn(false);
  //   }
  // };
  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get("http://localhost:3001");

          setBlogs(response.data.data);
        } catch (error) {
          console.log(error.message);
        }
      };

      const token = localStorage.getItem("Token");
      if (token !== null) {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
      fetchBlogs();
    } catch (error: any) {
      console.log(error.message);
    }
  }, [setBlogs]);

  const blog = blogs.map((blog) => (
    <Blog
      key={blog.blog_id}
      id={blog.blog_id}
      date={blog.date}
      image={blog.image}
      title={blog.title}
    />
  ));

  let content: any;

  if (isLoading) {
    content = <p className="text-center mt-3 text-2xl">Fetching Data...</p>;
  }
  if (blogs.length > 0) {
    content = blog;
  }

  return (
    <div className="min-h-[30rem]">
      {/* <NavLink
        to={isLoggedIn ? "new" : "/login"}
        className="bg-sky-500 w-32 my-4 p-4 text-xl block m-auto items-center text-center text-white hover:bg-sky-600 rounded"
        onClick={isUserLoggedIn}
      >
        Add Blog
      </NavLink> */}
      {isLoggedIn ? (
        <NavLink
          to="new"
          className="bg-sky-500 w-32 my-4 p-4 text-xl block m-auto items-center text-center text-white hover:bg-sky-600 rounded"
        >
          Add Blog
        </NavLink>
      ) : (
        ""
      )}

      {content}
    </div>
  );
}

export default BlogList;

import { useEffect, useState } from "react";
import Blog from "./Blog";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Buffer } from "buffer";
import img from "../assests/icons8-administrator-male-96.png";

type Blogs = {
  blog_id: string
  image: string;
  name: string;
  title: string;
  canBeLiked: string;
  likes: number;
  date: string;
  user_id: number;
  getUserBlog?: Promise<void>;
  showNameField?: boolean;
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
  const [userBlogs, setUserBlogs] = useState([]);
  const [showNameField, setShowNameFiled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [length, setLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const handlePrevPage = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - 5));
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + 5);
  };

  const getUserBlog = async (id) => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 5,
          offset: offset,
        },
      });
      const blogsWithImages = response.data.data.map((blog: any) => {
        const imageBase64 = `${Buffer.from(blog.image.data).toString(
          "base64"
        )}`;
        return {
          ...blog,
          image: `data:image/jpeg;base64,${imageBase64}`,
        };
      });
      // console.log(response.data.data);
      setUserBlogs(blogsWithImages);
      setShowNameFiled(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchBlogs = async () => {
        try {
          const token = localStorage.getItem("Token");

          const blogresponse = await axios({
            method: "GET",
            url: "http://localhost:3001",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 5,
              offset: offset,
            },
          });

          const blogsWithImages = blogresponse.data.data.map((blog: any) => {
            const imageBase64 = `${Buffer.from(blog.image.data).toString(
              "base64"
            )}`;
            return {
              ...blog,
              image: `data:image/jpeg;base64,${imageBase64}`,
            };
          });
          setBlogs(blogsWithImages);
          setLength(blogresponse.data.length);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchBlogs();
    } catch (error: any) {
      console.log(error.message);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [offset]);

  const blog = blogs.map((blog) => (
    <Blog
      key={blog.blog_id}
      id={blog.blog_id}
      user_id={blog.user_id}
      name={blog.name}
      date={blog.date}
      image={blog.image}
      title={blog.title}
      canBeLiked={blog.canBeLiked}
      likes={blog.likes}
      getUserBlog={getUserBlog}
    />
  ));

  const userBlog = userBlogs.map((blog) => {
    return (
      <Blog
        key={blog.blog_id}
        id={blog.blog_id}
        user_id={blog.user_id}
        name={blog.name}
        date={blog.date}
        image={blog.image}
        title={blog.title}
        canBeLiked={blog.canBeLiked}
        likes={blog.likes}
        showNameField={showNameField}
      />
    );
  });
  console.log(userBlog);

  let content: any;

  if (isLoading) {
    content = <p className="text-center mt-3 text-2xl">Fetching Data...</p>;
  }
  if (blogs.length > 0) {
    content = blog;
  }

  const reload = () => {
    window.location.reload();
  };
  return (
    <div className="min-h-[30rem]">
      {userBlog.length > 0 ? (
        <>
          <div className="flex m-auto justify-center my-6 ml-6">
            <img className="size-14 mr-2" src={img} alt="" />
            <div className="text-start text-4xl items-center text-gray-400">
              {userBlog[0].props.name}
            </div>
          </div>
          {userBlog}
          <p
            className="text-md block text-center m-auto mb-4 h-auto w-[60%] cursor-pointer"
            onClick={reload}
          >
            See All
          </p>
        </>
      ) : (
        <>
          {localStorage.getItem("Token") ? (
            <NavLink
              to="new"
              className="bg-sky-500 w-32 my-4 p-4 text-xl block m-auto items-center text-center text-white hover:bg-sky-600 rounded"
            >
              Add Blog
            </NavLink>
          ) : (
            <></>
          )}

          {content}
          <div className="text-2xl flex justify-center mb-6">
            <button
              className={`bg-blue-400 mr-2 w-8 h-8 rounded hover:bg-blue-500 ${
                offset === 0 ? "invisible" : ""
              } `}
              onClick={handlePrevPage}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              className={`bg-blue-400 ml-2 w-8 h-8 rounded hover:bg-blue-500 ${
                offset + 5 >= length ? "invisible" : ""
              } `}
              onClick={handleNextPage}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BlogList;

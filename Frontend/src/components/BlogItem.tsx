import { Link, useNavigate, useSubmit } from "react-router-dom";
import img from "../assests/icons8-administrator-male-96.png";
import heartWithoutColor from "../assests/icons8-heart-noColor.png";
import heartWithColor from "../assests/icons8-heart-withColor.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const BlogItem: React.FC<{ blog: any }> = (props) => {
  const [liked, setLiked] = useState(props.blog.blog[0].canBeLiked);
  const [count, setCount] = useState(props.blog.blog[0].likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [callBack, setCallBack] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();
  const submit = useSubmit();
  const imageBase64 = `${Buffer.from(props.blog.blog[0].image.data).toString(
    "base64"
  )}`;

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("Token");
      // if (token) {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/comment/${props.blog.blog[0].blog_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCommentCount(response.data.count);
      setComments(response.data.data);
      console.log(response.data.data);
      // }
    };
    fetchComments();
  }, [callBack, props.blog.blog]);

  function deleteHandler() {
    const proceed = window.confirm("Are you sure you want to delete it?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  const likesHandler = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        return navigate("../../login");
      } else {
        const response = await axios({
          method: "POST",
          url: `http://localhost:3001/like/${props.blog.blog[0].blog_id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLiked(response.data.data[0].canBeLiked);
        setCount(response.data.data[0].likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      if (comment.trim() !== "") {
        await axios({
          method: "POST",
          url: `http://localhost:3001/comment/${props.blog.blog[0].blog_id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            comment: comment,
          },
        });
        setCallBack(comment);
        setComment("");
      }
    } else {
      return navigate("../../login");
    }
  };

  return (
    <>
      <div className="block m-auto h-auto w-[50%] border-2 border-gray-100 mt-10 my-4 p-8 box-border shadow-sm">
        <Link to="/blog" className="text-md block ml-2 mb-4 h-auto">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
        <div className="flex justify-between m-auto my-6 ml-10">
          <div className="flex">
            <img className="size-14 mr-2" src={img} alt="" />
            <div className="text-start items-center text-gray-400">
              <p>{props.blog.blog[0].name}</p>
              <p>{props.blog.blog[0].date}</p>
            </div>
          </div>
          <div className="mr-12">
            {localStorage.getItem("name") === props.blog.blog[0].name ? (
              <Link
                to="edit"
                className="mr-4 bg-sky-400 p-3 px-6 rounded text-white hover:bg-sky-600 text-md"
              >
                Edit
              </Link>
            ) : (
              <></>
            )}
            {localStorage.getItem("name") === props.blog.blog[0].name ? (
              <button
                className="ml-4 bg-sky-400 p-3 px-4 rounded text-white hover:bg-sky-600 text-md"
                onClick={deleteHandler}
              >
                Delete
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <h1 className="ml-10 text-4xl mt-8 mb-8 font-serif font-bold">
          {props.blog.blog[0].title}
        </h1>
        <p className="mx-10 font-serif text-xl mb-10">
          Create a blog post subtitle that summarizes your post in a few short,
          punchy sentences and entices your audience to continue reading.
        </p>
        <img
          className="w-[89%] h-96 m-auto"
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt=""
        />

        <p className="mx-10 text-xl font-serif mt-5">
          {props.blog.blog[0].description}
        </p>
        <div className="border-t-2 flex mx-8 my-4 pt-3 relative">
          <p>{commentCount} comments</p>
          <p className="flex absolute left-[96%]">
            <img
              className="pr-[4px] w-6 cursor-pointer"
              src={liked === "true" ? heartWithoutColor : heartWithColor}
              onClick={likesHandler}
              alt=""
            />
            {count}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <textarea
          value={comment}
          onChange={handleChange}
          name="comment"
          id="comment"
          placeholder="Write your comment..."
          className="border-solid border border-black p-2"
          rows={3}
          cols={50}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="ml-4 bg-sky-400 px-4 rounded h-8 my-auto text-white hover:bg-sky-600 text-md"
        >
          Submit
        </button>
      </div>
      <div className="block m-auto h-auto w-[60%] border-b-2 border-gray-200 mt-10 my-2 p-8 box-border shadow-sm">
        <p className="text-xl font-medium pl-3">Comments</p>
        <ul className="mx-8">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="border-b border-gray-200 border-solid my-3 pl-3 py-2"
            >
              <div className="flex items-center relative">
                <img className="size-12 mr-2 " src={img} alt="" />
                <p className="text-gray-400 text-md">{comment.name}</p>
                <p className="right-0 absolute pr-4 text-gray-400 text-sm">
                  {comment.created_at}
                </p>
              </div>
              <li>{comment.comment}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlogItem;

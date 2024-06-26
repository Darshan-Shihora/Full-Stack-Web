import { Link, useNavigate } from "react-router-dom";
import img from "../assests/icons8-administrator-male-96.png";
import heartWithoutColor from "../assests/icons8-heart-noColor.png";
import heartWithColor from "../assests/icons8-heart-withColor.png";
import axios from "axios";
import { useState } from "react";
import { getCookie } from "./Login";

const Blog: React.FC<{
  id: string;
  image: string;
  name: string;
  title: string;
  canBeLiked: string;
  likes: number;
  date: string;
  user_id: number;
  getUserBlog?: (id) => Promise<void>;
  showNameField?: boolean;
}> = (props) => {
  const [liked, setLiked] = useState(props.canBeLiked);
  const [count, setCount] = useState(props.likes);
  const navigate = useNavigate();
  const token = getCookie("Token");

  const likesHandler = async () => {
    try {
      // const token = localStorage.getItem("Token");
      if (!token) {
        return navigate("../login");
      } else {
        const response = await axios({
          method: "POST",
          url: `http://localhost:3001/like/${props.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data[0]);

        setLiked(response.data.data[0].canBeLiked);
        setCount(response.data.data[0].likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    props.getUserBlog(props.user_id);
  };

  return (
    <div className="block m-auto h-auto w-[40vw] border-2 border-gray-100 my-8 pb-4 box-border shadow-sm">
      <Link to={`/blog/${props.id}`}>
        <img className="w-[100%] h-96 mb-6" src={`${props.image}`} alt="" />
      </Link>
      {props.showNameField ? (
        <></>
      ) : (
        <div className="flex m-auto mb-6 ml-6">
          <img className="size-14 mr-2" src={img} alt="" />
          <div className="text-start items-center text-gray-400">
            <p className="cursor-pointer" onClick={handleClick}>
              {props.name}
            </p>
            <p>{props.date}</p>
          </div>
        </div>
      )}

      <Link
        to={`/blog/${props.id}`}
        className="ml-6 mt-6 text-3xl font-serif font-medium hover:text-sky-500"
      >
        {props.title}
      </Link>
      <Link
        to={`/blog/${props.id}`}
        className="ml-6 flex text-md font-serif text-sky-400 hover:text-sky-600"
      >
        Click here to read the full blog
      </Link>
      <div className="border-t-2 flex justify-end mx-6 my-4 pt-3 relative">
        <p className="flex">
          <button onClick={likesHandler}>
            <img
              className="pr-[4px] w-6 cursor-pointer"
              src={liked === "true" ? heartWithoutColor : heartWithColor}
              alt=""
            />
          </button>
          {count}
        </p>
      </div>
    </div>
  );
};

export default Blog;

import { Link } from "react-router-dom";
import img from "../assests/icons8-administrator-male-96.png";
import heartImg from "../assests/icons8-heart-16.png";
import eyeImg from "../assests/icons8-eye-16.png";
import messageImg from "../assests/icons8-message-16.png";

const Blog: React.FC<{
  id: string;
  image: string;
  title: string;
  date: string;
}> = (props) => {
  return (
    <div className=" block m-auto h-auto w-[55vw] border-2 border-gray-100 my-8 pb-4 box-border shadow-sm">
      <Link to={`/blog/${props.id}`}>
        <img className="w-[100%] h-96" src={`${props.image}`} alt="" />
      </Link>
      <div className="flex m-auto my-6 ml-6">
        <img className="size-14 mr-2" src={img} alt="" />
        <div className="text-start items-center text-gray-400">
          <p>{localStorage.getItem("name")}</p>
          <p>{props.date}</p>
        </div>
      </div>
      <Link
        to={`/blog/${props.id}`}
        className="ml-6 text-3xl font-serif font-medium hover:text-sky-500"
      >
        {props.title}
      </Link>
      <Link
        to={`/blog/${props.id}`}
        className="ml-6 flex text-md font-serif text-sky-400 hover:text-sky-600"
      >
        Click here to read the full blog
      </Link>
      <div className="border-t-2 flex mx-6 my-4 pt-3 relative">
        <p className="flex pr-4">
          <img className="pr-[3px] w-6" src={eyeImg} alt="" />
          100
        </p>
        <p className="flex">
          <img className="pr-[4px] w-6" src={messageImg} alt="" />2
        </p>
        <p className="flex ml-[80%] ">
          <img className="pr-[4px] w-6" src={heartImg} alt="" />
          48
        </p>
      </div>
    </div>
  );
};

export default Blog;

import { Link, useSubmit } from "react-router-dom";
import img from "../assests/icons8-administrator-male-96.png";
import heartImg from "../assests/icons8-heart-16.png";
import eyeImg from "../assests/icons8-eye-16.png";
import messageImg from "../assests/icons8-message-16.png";

const BlogItem: React.FC<{ blog: any }> = (props) => {
  console.log(props.blog);

  const submit = useSubmit();

  function deleteHandler() {
    const proceed = window.confirm("Are you sure you want to delete it?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <>
      <div className="block m-auto h-auto w-[60%] border-2 border-gray-100 mt-10 my-4 p-8 box-border shadow-sm">
        <div className="flex justify-between m-auto my-6 ml-10">
          <div className="flex">
            <img className="size-14 mr-2" src={img} alt="" />
            <div className="text-start items-center text-gray-400">
              <p>Admin</p>
              <p>{props.blog.blog.date}</p>
            </div>
          </div>
          <div className="mr-12">
            <Link
              to="edit"
              className="mr-4 bg-sky-400 p-3 px-6 rounded text-white hover:bg-sky-600 text-md"
            >
              Edit
            </Link>
            <button
              className="ml-4 bg-sky-400 p-3 px-4 rounded text-white hover:bg-sky-600 text-md"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
        <h1 className="ml-10 text-4xl mt-8 mb-8 font-serif font-bold">
          {props.blog.blog.title}
        </h1>
        <p className="mx-10 font-serif text-xl mb-10">
          Create a blog post subtitle that summarizes your post in a few short,
          punchy sentences and entices your audience to continue reading.
        </p>
        <img
          className="w-[90%] h-[96%] m-auto block"
          src={`${props.blog.blog.image}`}
          alt=""
        />

        <p className="mx-10 text-xl font-serif mt-5">
          {props.blog.blog.description}
        </p>
        <div className="border-t-2 flex mx-6 my-4 pt-3 relative">
          <p className="flex pr-4">
            <img className="pr-[3px] w-6" src={eyeImg} alt="" />
            100
          </p>
          <p className="flex">
            <img className="pr-[4px] w-6" src={messageImg} alt="" />2
          </p>
          <p className="flex absolute left-[96%]">
            <img className="pr-[4px] w-6" src={heartImg} alt="" />
            48
          </p>
        </div>
      </div>
      <Link
        to="/blog"
        className="text-md block text-end m-auto mb-4 h-auto w-[60%]"
      >
        See All
      </Link>
    </>
  );
};

export default BlogItem;

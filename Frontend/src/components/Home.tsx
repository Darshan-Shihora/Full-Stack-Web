import img from "../assests/travel.webp";
import image from "../assests/blog.webp";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="h-auto text-center">
      <div className="relative w-full h-[60%]">
        <img src={img} alt="" />
        <main className=" top-0 left-0 w-full h-full z-1 absolute justify-center items-center ">
          <p className="text-white font-normal text-xl opacity-1 pt-24">
            Travel Blog
          </p>
          <p className="text-white font-bold text-7xl">Going Places</p>
          <p className="text-white pt-4 text-base">
            I haven’t been everywhere, but it’s on my list
          </p>
        </main>
      </div>
      <p className="pt-8 px-8 max-w-[36rem] m-auto text-gray-400">
        I'm a paragraph. Click here to add your own text and edit me. It’s easy.
      </p>
      <p className="text-gray-400">
        Just click “Edit Text” or double click me to add your own content and
        make changes to the font.
      </p>
      <div className="relative m-auto mt-8 mb-12">
        <img className="m-auto" src={image} alt="" />
        <Link
          className={`absolute bottom-[45%] right-[45%] rounded bg-white px-10 py-4 text-2xl font-serif text-sky-600 hover:text-white hover:bg-sky-500`}
          to="/blog"
        >
          Travel
        </Link>
      </div>
    </div>
  );
}

export default Home;

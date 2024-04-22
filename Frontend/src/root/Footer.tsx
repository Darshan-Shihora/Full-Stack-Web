import img from "../../src/assests/profile.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="w-full text-center flex justify-center items-center px-36 py-4 bg-gray-400">
      <img className="pr-7 h-32 w-40" src={img} alt="" />
      <div className="text-start">
        <p className="font-bold text-2xl">About Me</p>
        <p className="text-md font-normal font-serif py-2">
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font.
        </p>
        <Link to="/about-me" className="underline">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default Footer;

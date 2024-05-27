import img from "../../src/assests/profile.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="w-full text-center flex justify-center items-center px-36 py-4 bg-gray-400">
      <img className="pr-7 h-32 w-40" src={img} alt="" />
      <div className="text-start">
        <p className="font-bold text-2xl">About Me</p>
        <p className="text-md font-normal font-serif py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          autem aliquam odio odit atque culpa debitis veniam tempore quia natus
          deserunt possimus iste ducimus nisi asperiores, at iure dolorum cumque
          eligendi. Mollitia optio sunt blanditiis culpa delectus, non
          consequuntur explicabo.
        </p>
        <Link to="/about-me" className="underline">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default Footer;

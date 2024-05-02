import img from "../../src/assests/icons8-b-96.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem("Token")
  );
  const logoutHandler = () => {
    setisAuthenticated(null);
    localStorage.clear();
    return navigate("/");
  };
  return (
    <nav className=" bg-sky-400 flex justify-between px-4 sticky top-0 z-10 items-center">
      <span className="text-3xl flex items-center font-bold pt-2">
        <img className="h-20 w-13 pb-[13px] pl-[6px]" src={img} alt="B" />
        log
      </span>
      <div className="flex text-white">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-700 mx-6 text-xl font-bold"
              : "mx-6 text-xl font-normal"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-700 mx-6 text-xl font-bold"
              : "mx-6 text-xl font-normal"
          }
          to="/blog"
        >
          Blog
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-700 mx-6 text-xl font-bold"
              : "mx-6 text-xl font-normal"
          }
          to="/about-me"
        >
          About me
        </NavLink>
      </div>
      <div className="flex">
        {isAuthenticated ? (
          <div className="flex gap-4">
            <p className=" py-2">{localStorage.getItem("name")}</p>
            <button
              className="p-3 text-center w-24 font-semibold text-white bg-gray-600 hover:bg-gray-500"
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="p-3 mr-3 font-semibold text-white bg-gray-600 hover:bg-gray-500 "
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;

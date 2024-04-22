import img from "../../src/assests/icons8-b-96.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../components/FIreBase-config";
import { signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const navigate = useNavigate();
  function navigateTo() {
    signOut(auth).then(() => {
      navigate("/sign-up");
    });
  }
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
        {/* <button
          onClick={navigateTo}
          className="p-3 text-center w-20 font-semibold text-white bg-gray-600 hover:bg-gray-500 "
        >
          Logout
        </button> */}
        {/* <Link
          to="/sign-up"
          // onClick={handleClick}
          className="p-3 mr-3 font-semibold text-white bg-gray-600 hover:bg-gray-500 "
          >
          Log In
        </Link> */}
        {isAuthenticated ? (
          <button
            className="p-3 text-center w-24 font-semibold text-white bg-gray-600 hover:bg-gray-500"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
}

export default Header;

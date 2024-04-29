import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const nameInputHandler = (event) => {
    setName(event.target.value);
  };

  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmission = async () => {
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      setErrMsg("Fields can't be empty");
    } else {
      const response = await axios.post("http://localhost:3001/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      }
      if (response.status === 200) {
        setErrMsg(response.data.message);
        console.log(response.data.message);
      }
    }
  };

  return (
    <div className="h-full w-full  min-h-screen flex justify-center items-center">
      <div className="min-w-[480px] bg-gray-100 h-fit w-fit p-8 rounded-xl flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Signup</h1>
        <label className="font-bold text-xl text-sky-500" htmlFor="name">
          Name
        </label>
        <input
          className="rounded-md focus:bg-sky-50 border-gray-400 border outline-none py-3 px-4 text-black hover:border-sky-400"
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={nameInputHandler}
          value={name}
        />
        <label className="text-xl font-bold text-sky-500" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md focus:bg-sky-50 border-gray-400 border outline-none py-3 px-4 text-black   hover:border-sky-400"
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          onChange={emailInputHandler}
          value={email}
        />
        <label className="text-xl font-bold text-sky-500" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md focus:bg-sky-50 border-gray-400 border outline-none py-3 px-4 text-black  hover:border-sky-400"
          id="password"
          name="password"
          type="password"
          placeholder={`Enter password`}
          onChange={passwordInputHandler}
          value={password}
        />

        <div className="flex flex-col gap-5">
          <b className="font-bold text-xs items-center text-red-400">
            {errMsg}
          </b>
          <button
            className="outline-none  border-none rounded-md font-bold text-lg py-3 px-4 w-full cursor-pointer transition-colors bg-sky-300 text-white hover:bg-sky-400 disabled:bg-gray-200"
            onClick={handleSubmission}
          >
            Signup
          </button>
          <p className="font-bold">
            Already have an account?{" "}
            <span>
              <Link className="text-sky-500 text-base" to="/login">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

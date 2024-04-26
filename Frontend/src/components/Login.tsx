import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmission = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });

      console.log(response);
      if (response.status === 202) {
        localStorage.setItem("Token", response.data.data.token);
        navigate("..");
      }
    } catch (error) {
      if (error.response.status === 403) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(error.response.data.message);
      }
      console.log(error.response.status);
    }
  };

  return (
    <div className="h-full w-full  min-h-screen flex justify-center items-center">
      <div className="min-w-[480px] bg-gray-100 h-fit w-fit p-8 rounded-xl flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Login</h1>
        <label className="font-bold text-xl text-sky-500" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md border-gray-400 border outline-none py-3 px-4 text-black hover:border-sky-400 focus:bg-sky-50"
          id="email"
          name="email"
          type="email"
          onChange={emailInputHandler}
          value={email}
          placeholder="Enter email address"
        />
        <label className="font-bold text-xl text-sky-500" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md border-gray-400 border outline-none py-3 px-4 text-black hover:border-sky-400 focus:bg-sky-50"
          id="password"
          name="Password"
          type="password"
          onChange={passwordInputHandler}
          value={password}
          placeholder="Enter Password"
        />

        <div className="flex flex-col gap-5">
          <b className="font-bold text-xs items-center text-red-400">
            {errorMsg}
          </b>
          <button
            className="outline-none border-none rounded-md font-bold text-lg py-3 px-4 w-full cursor-pointer transition-colors bg-sky-300 text-white hover:bg-sky-400 disabled:bg-gray-200"
            onClick={handleSubmission}
          >
            Login
          </button>
          <p className="font-bold">
            Want to create new account?{" "}
            <span>
              <Link className="text-sky-500 text-base" to="/sign-up">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

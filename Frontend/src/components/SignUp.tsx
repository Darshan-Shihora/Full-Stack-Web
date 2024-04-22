import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./FIreBase-config";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
    .then(async (res) => {
      setSubmitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user, {
        displayName: values.name,
      });
      localStorage.setItem('email', values.email)
        navigate(window.location.origin);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="h-full w-full  min-h-screen flex justify-center items-center">
      <div className="min-w-[480px] bg-gray-100 h-fit w-fit p-8 rounded-xl flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Signup</h1>
        <label className="font-bold text-xl text-sky-500" htmlFor="Name">
          Name
        </label>
        <input
          className="rounded-md border-gray-400 border outline-none py-3 px-4 text-black hover:border-sky-400"
          id="Name"
          type="text"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <label className="text-xl font-bold text-sky-500" htmlFor="Email">
          Email
        </label>
        <input
          className="rounded-md border-gray-400 border outline-none py-3 px-4 text-black   hover:border-sky-400"
          id="Email"
          type="email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <label className="text-xl font-bold text-sky-500" htmlFor="Password">
          Password
        </label>
        <input
          className="rounded-md border-gray-400 border outline-none py-3 px-4 text-black  hover:border-sky-400"
          id="Password"
          type="password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className="flex flex-col gap-5">
          <b className="font-bold text-xs items-center text-red-400">
            {errorMsg}
          </b>
          <button
            className="outline-none border-none rounded-md font-bold text-lg py-3 px-4 w-full cursor-pointer transition-colors bg-sky-300 text-white hover:bg-sky-400 disabled:bg-gray-200"
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
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

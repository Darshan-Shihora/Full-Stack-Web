// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./FIreBase-config";

// function Login() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     email: "",
//     pass: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

//   const handleSubmission = () => {
//     if (!values.email || !values.pass) {
//       setErrorMsg("Fill all fields");
//       return;
//     }
//     setErrorMsg("");

//     setSubmitButtonDisabled(true);
//     signInWithEmailAndPassword(auth, values.email, values.pass)
//       .then(async (res) => {
//         setSubmitButtonDisabled(false);

//         navigate("/");
//       })
//       .catch((err) => {
//         setSubmitButtonDisabled(false);
//         setErrorMsg(err.message);
//       });
//   };
//   return (
//     <div className="h-full w-full  min-h-screen flex justify-center items-center">
//       <div className="min-w-[480px] bg-gray-100 h-fit w-fit p-8 rounded-xl flex flex-col gap-5">
//         <h1 className="text-3xl font-semibold">Login</h1>
//         <label className="font-bold text-xl text-sky-500" htmlFor="Email">
//           Email
//         </label>
//         <input
//           className="rounded-md border-gray-400 border outline-none py-3 px-4 text-black hover:border-sky-400"
//           id="Email"
//           type="email"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, email: event.target.value }))
//           }
//           placeholder="Enter email address"
//         />
//         <label className="font-bold text-xl text-sky-500" htmlFor="Password">Password</label>
//         <input
//           className="rounded-md border-gray-400 border outline-none py-3 px-4 text-black hover:border-sky-400"
//           id="Password"
//           type="password"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, pass: event.target.value }))
//           }
//           placeholder="Enter Password"
//         />

//         <div className="flex flex-col gap-5">
//           <b className="font-bold text-xs items-center text-red-400">
//             {errorMsg}
//           </b>
//           <button
//             className="outline-none border-none rounded-md font-bold text-lg py-3 px-4 w-full cursor-pointer transition-colors bg-sky-300 text-white hover:bg-sky-400 disabled:bg-gray-200"
//             disabled={submitButtonDisabled}
//             onClick={handleSubmission}
//           >
//             Login
//           </button>
//           <p className="font-bold">
//             Already have an account?{" "}
//             <span>
//               <Link className="text-sky-500 text-base" to="/sign-up">
//                 Sign up
//               </Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useAuth0 } from "@auth0/auth0-react";
function Login() {
  const { loginWithRedirect } = useAuth0();

  return <button className="p-3 text-center w-20 font-semibold text-white bg-gray-600 hover:bg-gray-500" onClick={() => loginWithRedirect()}>Log In</button>;
}

export default Login

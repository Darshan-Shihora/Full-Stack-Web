import { useAuth0 } from "@auth0/auth0-react";
function Login() {
  const { loginWithRedirect } = useAuth0();

  return <button className="p-3 text-center w-20 font-semibold text-white bg-gray-600 hover:bg-gray-500" onClick={() => loginWithRedirect()}>Log In</button>;
}

export default Login

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center my-16 lg:my-0">
      <div className="w-[80%] lg:w-[40%] border shadow-lg px-5 py-10 bg-slate-100">
        <div>
          <h2 className="text-center text-4xl text-blue-500 font-bold my-5">
            Login Now !
          </h2>
        </div>
        <form action="">
          <div className="mb-5">
            <label className="mx-4 font-semibold text-blue-500" htmlFor="">
              Email :
            </label>
            <div>
              <input
                className="bg-slate-100 w-full border shadow px-4 py-2 rounded my-2 bg-none "
                type="email"
                name="email"
                placeholder="Enter Your Email"
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="mx-4 font-semibold text-blue-500" htmlFor="">
              Password :
            </label>
            <div className="relative">
              <input
                className="bg-slate-100 w-full border shadow px-4 py-2 rounded my-2 bg-none "
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Enter Your Password"
              />
              <div className="text-blue-500 flex absolute right-7 top-5 ">
                <button onClick={handleShowPassword}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full text-xl font-semibold bg-blue-500 text-white py-2 rounded">
              Log In
            </button>
          </div>
          <div className="divider my-8">OR</div>
          <button className="w-full text-xl font-semibold bg-blue-500 text-white py-2 rounded">
            Google
          </button>
          <div className="my-10 mx-2">
            <p>
              New to Melody Academy ?{" "}
              <Link className="text-blue-500 font-bold">Registration</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import logoImg from "../img/authImg.png";
import Google from "./Google";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { users } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" grid lg:grid-cols-2 gap-20 items-center py-20 lg:my-0">
      <div className=" w-[90%] mx-auto ">
        <img className=" h-[80%]" src={logoImg} alt="" />
      </div>

      <div className="w-[80%] lg:w-[70%] border shadow-lg px-8 py-10 bg-slate-50 rounded  mx-auto">
        <div>
          <h2 className="text-center text-4xl textColor font-bold my-5  pb-2">
            Login Now !
          </h2>
        </div>
        <form action="">
          <div className="mb-5 ">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Email :
            </label>
            <div className="relative">
              <div>
                <input
                  className="focus:outline-none bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none "
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                />
              </div>
              {/* <div className="text-pink-800 absolute top-4 left-4 ">
                <FontAwesomeIcon icon={faEnvelope} />
              </div> */}
            </div>
          </div>
          <div className="mb-5">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Password :
            </label>
            <div className="relative">
              <input
                className="focus:outline-none bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none "
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
              />
              <div className="text-pink-800 absolute right-7 top-4 ">
                <FontAwesomeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  icon={faEye}
                />
              </div>
              {/* <div className="text-pink-800 absolute top-4 left-4 ">
                <FontAwesomeIcon icon={faLock} />
              </div> */}
            </div>
          </div>
          <div>
            <button className="w-full text-xl font-semibold bgColor text-white py-2 rounded">
              Log In
            </button>
          </div>
        </form>
        <div className="divider my-5">OR</div>
        <Google />
        <div className="mt-10 mx-2">
          <p className="text-slate-500">
            New to Melody Academy ?{" "}
            <Link to="/registration" className="textColor font-bold ">
              Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

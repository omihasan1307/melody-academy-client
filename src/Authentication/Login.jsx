import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import logoImg from "../img/authImg.png";
import Google from "./Google";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { signUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    signUser(data?.email, data?.password)
      .then((res) => {
        reset();
        const user = res.user;
        console.log(user);
        enqueueSnackbar("User loggedIn successfully", {
          variant: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        enqueueSnackbar("Please enter the correct email & password", {
          variant: "error",
        });
        console.log("dsdd", error.message);
      });
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 ">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Email :
            </label>
            <div className="relative">
              <div>
                <input
                  {...register("email", {
                    required: true,
                  })}
                  className="focus:outline-none bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none "
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                />
              </div>
              {errors.email && (
                <span className="text-red-800 font-semibold mx-3">
                  This Email field is required
                </span>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Password :
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  maxLength: 6,
                  pattern: /^[0-9a-z]+$/,
                })}
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
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-800 font-semibold mx-3">
                This password field is required
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-800 font-semibold mx-3">
                This password must be 6 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-800 font-semibold mx-3">
                Password must contain only numbers and lowercase letters
              </span>
            )}
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

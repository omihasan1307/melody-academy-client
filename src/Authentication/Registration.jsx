import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import registerImg from "../img/register.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import Google from "./Google";
import { useSnackbar } from "notistack";
import axios from "axios";

const Registration = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { createUser, updatedProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.password === data.confirmPassword) {
      createUser(data.email, data.password)
        .then((result) => {
          const user = result.user;
          updatedProfile(data?.name, data?.photo)
            .then(() => {
              console.log(result.user);
              const { displayName, email, photoURL, uid } = result.user;
              axios.post("http://localhost:5000/users", {
                displayName,
                email,
                photoURL,
                uid,
                role: "student",
              });
              reset();
              enqueueSnackbar(
                `Hi ${user?.displayName}, Welcome to Melody Academy `,
                {
                  variant: "success",
                }
              );
              navigate(from, { replace: true });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      enqueueSnackbar("Wrong password , Please match the password", {
        variant: "error",
      });
    }
  };

  return (
    <div className=" grid lg:grid-cols-2 gap-20 items-center py-10  lg:my-0">
      <div className=" w-[90%] mx-auto ">
        <img className=" h-[80%]" src={registerImg} alt="" />
      </div>

      <div className="w-[80%] lg:w-[70%] border shadow-lg px-8 py-10 bg-slate-50 rounded  mx-auto ">
        <div>
          <h2 className="text-center text-4xl textColor font-bold mt-2 mb-3  pb-2">
            Register Now !
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 ">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Name :
            </label>
            <div className="relative">
              <div>
                <input
                  {...register("name", { required: true })}
                  className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
                  type="name"
                  name="name"
                  placeholder="Enter Your name"
                />
              </div>
            </div>
            <p>
              {" "}
              {errors.name && (
                <span className="text-red-800 font-semibold mx-3">
                  This Name field is required
                </span>
              )}
            </p>
          </div>
          <div className="mb-3 ">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Email :
            </label>
            <div className="relative">
              <div>
                <input
                  {...register("email", { required: true })}
                  className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none "
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>
            {errors.email && (
              <span className="text-red-800 font-semibold mx-3">
                This Email field is required
              </span>
            )}
          </div>
          <div className="mb-3">
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
                className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none  focus:outline-none"
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
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Confirm Password :
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: true,
                  maxLength: 6,
                  pattern: /^[0-9a-z]+$/,
                })}
                className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
                type={confirmShowPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter Your confirm Password"
              />
              <div className="text-pink-800 absolute right-7 top-4 ">
                <FontAwesomeIcon
                  onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                  icon={faEye}
                />
              </div>
            </div>
            {errors.confirmPassword?.type === "required" && (
              <span className="text-red-800 font-semibold mx-3">
                This password field is required
              </span>
            )}
            {errors.confirmPassword?.type === "maxLength" && (
              <span className="text-red-800 font-semibold mx-3">
                This password must be 6 characters
              </span>
            )}
            {errors.confirmPassword?.type === "pattern" && (
              <span className="text-red-800 font-semibold mx-3">
                Password must contain only numbers and lowercase letters
              </span>
            )}
          </div>
          <div className="mb-3 ">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Photo URL :
            </label>
            <div className="relative">
              <div>
                <input
                  {...register("photo", { required: true })}
                  className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none "
                  type="text"
                  name="photo"
                  placeholder="Enter Your Photo URL"
                />
              </div>
            </div>
            {errors.photo && (
              <span className="text-red-800 font-semibold mx-3">
                This photo field is required
              </span>
            )}
          </div>
          <div>
            <input
              className="w-full text-xl font-semibold bgColor text-white py-2 rounded"
              type="submit"
              value="Log In"
            />
          </div>
        </form>
        <div className="divider my-5">OR</div>
        <Google />
        <div className="mt-10 mx-2">
          <p className="text-slate-500">
            Already an account ?{" "}
            <Link to="/login" className="textColor font-bold ">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;

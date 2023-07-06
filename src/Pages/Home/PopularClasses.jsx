import React, { useContext, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useAllClasses from "../../hooks/useAllClasses";
import { AuthContext } from "../../providers/AuthProvider";
import useRole from "../../hooks/useRole";

const PopularClasses = () => {
  const [role] = useRole();
  const { users } = useContext(AuthContext);
  const [classes, refetch, isLoading] = useAllClasses();
  const navigate = useNavigate();
  console.log(classes);
  const create = moment().format("MMMM Do YYYY, h:mm:ss a");

  const handleAddtoCart = (item) => {
    console.log(item);
    const {
      _id,
      className,
      email,
      photo,
      enroll,
      name,
      price,
      seats,
      status,
      category,
      description,
    } = item;
    if (users) {
      axios
        .post(
          `http://localhost:5000/cart?email=${users?.email}`,
          {
            create,
            classesID: _id,
            className,
            email,
            photo,
            enroll,
            name,
            price,
            seats,
            status,
            category,
            description,
            userEmail: users?.email,
          },
          {
            headers: {
              authorization: localStorage.getItem("access_token"),
            },
          }
        )
        .then((data) => {
          refetch();
          if (data.data.isExist) {
            enqueueSnackbar(
              `Hi ${users?.displayName}, Your Product Already  added `,
              {
                variant: "error",
              }
            );
          } else {
            enqueueSnackbar(
              `Hi ${users?.displayName}, Your Product has been added `,
              {
                variant: "success",
              }
            );
          }
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-center mt-28 mb-16">
        Popular <span className="textColor"> CLasses</span>
      </h2>
      <div className="flex justify-center my-10">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-ring loading-lg text-secondary mx-auto "></span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-20 ">
            {classes?.slice(0, 6)?.map((cls) => (
              <div
                key={cls._id}
                className={`border px-8 py-10 rounded-xl ${
                  cls.seats > 0 ? "bg-white" : "bg-red-300 text-white"
                }`}
              >
                <div className=" rounded-3xl">
                  <img
                    className="object-cover w-[300px] h-[200px] rounded-xl"
                    src={cls?.photo}
                    alt=""
                  />
                </div>
                <div className="mt-5">
                  <h2 className="text-xl font-bold textColor">
                    {cls.className}
                  </h2>
                  <h2 className="text-normal  mt-2">
                    Instructor Name : {cls.name}
                  </h2>
                  <h2 className="text-normal mt-2">
                    Available Seats: {cls.seats}
                  </h2>
                  <h2 className="text-normal mt-2"> Price: ${cls.price}</h2>
                  <h2 className="text-normal mt-2"> Enrolled : {cls.enroll}</h2>
                  <button
                    disabled={
                      role?.role === "student" && cls.seats > 0
                        ? false
                        : (isLoading && !role && cls.seats === 0) || role
                        ? true
                        : false
                    }
                    onClick={() => handleAddtoCart(cls)}
                    className={`uppercase  text-white w-full mt-4 py-2 rounded ${
                      cls.seats > 0 ? "bgColor" : "bg-slate-600"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularClasses;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClasses = () => {
  const { users, loggedOut } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    axios.post(img_hosting_url, formData).then((res) => {
      // console.log(res.data.data);
      if (res.data.success) {
        const imgURL = res.data.data.display_url;
        const {
          category,
          className,
          description,
          email,
          name,
          price,
          seats,
          photo,
        } = data;
        const newItem = {
          category,
          className,
          description,
          email,
          name,
          price: parseFloat(price),
          seats: parseInt(seats),
          photo: imgURL,
          status: null,
        };
        console.log("newItem", newItem);
        axios
          .post(
            `http://localhost:5000/manageClasses?email=${users?.email}`,
            newItem,
            {
              headers: {
                authorization: localStorage.getItem("access_token"),
              },
            }
          )
          .then((data) => {
            enqueueSnackbar(`Hi ${users?.displayName}, Your class added `, {
              variant: "success",
            });
            // loggedOut();

            console.log("sending done", data.data);
          });
      }
      reset();
    });
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[70%] border shadow-lg px-8 py-10 bg-slate-50 rounded  mx-auto my-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Class Name
            </label>{" "}
            <br />
            <input
              {...register("className", { required: true })}
              className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
              type="text"
              name="className"
              placeholder="Class Name"
            />
            {errors.className && (
              <span className="text-red-800 font-semibold mx-3">
                This Class Name field is required
              </span>
            )}
          </div>
          <div className="flex ">
            <div className="mb-3 w-[50%] me-5">
              <label className="mx-4 font-semibold textColor" htmlFor="">
                Price
              </label>{" "}
              <br />
              <input
                {...register("price", { required: true })}
                className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
                type="number"
                name="price"
                placeholder="price"
              />
              {errors.price && (
                <span className="text-red-800 font-semibold mx-3">
                  This Price field is required
                </span>
              )}
            </div>
            <div className="mb-3 w-[50%]">
              <label className="mx-4 font-semibold textColor" htmlFor="">
                Available Seats
              </label>{" "}
              <br />
              <input
                {...register("seats", { required: true })}
                className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
                type="number"
                name="seats"
                placeholder="Available Seats"
              />
              {errors.seats && (
                <span className="text-red-800 font-semibold mx-3">
                  This Seats field is required
                </span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Category
            </label>{" "}
            <br />
            <select
              {...register("category", { required: true })}
              defaultValue="Pick One"
              name="category"
              className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
            >
              <option disabled>Pick One</option>
              <option>Guitar</option>
              <option>Keyboard</option>
              <option>Drums</option>
              <option>Bass</option>
              <option>Piano</option>
            </select>
            {errors.cateogory && (
              <span className="text-red-800 font-semibold mx-3">
                This category field is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor">
              Instractor Name
            </label>{" "}
            <br />
            <input
              {...register("name", { required: true })}
              className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
              type="text"
              defaultValue={users?.displayName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Instractor Email
            </label>{" "}
            <br />
            <input
              {...register("email", { required: true })}
              className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
              type="text"
              defaultValue={users?.email}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Image
            </label>{" "}
            <br />
            <div className="form-control w-full">
              <input
                {...register("photo", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full  my-2 "
                name="photo"
              />
              {errors.photo && (
                <span className="text-red-800 font-semibold mx-3">
                  This Image field is required
                </span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Description
            </label>{" "}
            <br />
            <textarea
              {...register("description", { required: true })}
              className="textarea bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none "
              placeholder="Description"
              name="description"
            ></textarea>
            {errors.description && (
              <span className="text-red-800 font-semibold mx-3">
                This description field is required
              </span>
            )}
          </div>
          <div>
            <input
              className="bgColor w-full py-2 text-white rounded "
              type="submit"
              value="Add Classes"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClasses;

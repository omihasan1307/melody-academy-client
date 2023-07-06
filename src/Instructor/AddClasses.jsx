import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClasses = () => {
  const { users, loggedOut } = useContext(AuthContext);

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleSubmit = (data) => {
    data.preventDefault();

    const form = data.target;
    const className = form.className.value;
    const price = form.price.value;
    const seats = form.seats.value;
    const name = form.instructorName.value;
    const email = form.instructorEmail.value;
    const category = form.category.value;
    const photo = form?.photo?.files[0];
    const description = form.description.value;

    const allData = {
      className,
      price,
      email,
      name,
      category,
      photo,
      description,
      seats,
    };

    const formData = new FormData();
    formData.append("image", photo);

    axios.post(img_hosting_url, formData).then((res) => {
      if (res.data.success) {
        const imgURL = res.data.data.display_url;

        const { category, className, description, email, name, price, seats } =
          allData;
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
            `https://summer-camp-server-three-gamma.vercel.app/manageClasses?email=${users?.email}`,
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
            console.log("sending done", data.data);
          });
      }
      form.reset();
    });
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[70%] border shadow-lg px-8 py-10 bg-slate-50 rounded  mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Class Name
            </label>{" "}
            <br />
            <input
              className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
              type="text"
              name="className"
              placeholder="Class Name"
              required
            />
          </div>
          <div className="flex ">
            <div className="mb-3 w-[50%] me-5">
              <label className="mx-4 font-semibold textColor" htmlFor="">
                Price
              </label>{" "}
              <br />
              <input
                className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
                type="number"
                name="price"
                placeholder="price"
                required
              />
            </div>
            <div className="mb-3 w-[50%]">
              <label className="mx-4 font-semibold textColor" htmlFor="">
                Available Seats
              </label>{" "}
              <br />
              <input
                className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
                type="number"
                name="seats"
                placeholder="Available Seats"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Category
            </label>{" "}
            <br />
            <select
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
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor">
              Instractor Name
            </label>{" "}
            <br />
            <input
              className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
              name="instructorName"
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
              className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
              type="text"
              name="instructorEmail"
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
                type="file"
                className="file-input file-input-bordered w-full  my-2 "
                name="photo"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="mx-4 font-semibold textColor" htmlFor="">
              Description
            </label>{" "}
            <br />
            <textarea
              className="textarea bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none "
              placeholder="Description"
              name="description"
            ></textarea>
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

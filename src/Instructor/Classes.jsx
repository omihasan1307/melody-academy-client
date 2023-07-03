import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClasses from "../hooks/useClasses";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Classes = () => {
  const { users } = useContext(AuthContext);
  const [classData, isLoading, refetch] = useClasses();
  const [updateData, setUpdateData] = useState("");

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:5000/manageClasses/${_id._id}`,
            { _id },
            {
              headers: {
                authorization: localStorage.getItem("access_token"),
              },
            }
          )
          .then((res) => {
            refetch();
            if (res) {
              Swal.fire("Deleted!", "Your class has been deleted.", "success");
            }
          });
      }
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const form = event?.target;
    const className = form?.className?.value;
    const price = form?.price?.value;
    const seats = form?.seats?.value;

    const update = {
      className,
      price,
      seats,
    };

    axios
      .patch(
        `http://localhost:5000/allClasses/${updateData._id}?email=${users?.email}`,
        update,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      )
      .then((data) => {
        refetch();
        console.log(data.data);
      });

    console.log("updateData", update);
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-ring loading-lg text-secondary mx-auto "></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>price</th>
                <th>Seats</th>
                <th>Total Enroll</th>
                <th>FeedBack</th>
                <th>Status</th>
                <th>Action</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody className="text-left ">
              {classData.map((cls, index) => (
                <tr key={index} className="hover">
                  <td>{index + 1}</td>
                  <td>{cls.className}</td>
                  <td>${cls.price}</td>
                  <td>{cls.seats}</td>
                  <td>0 (students)</td>
                  <td>... </td>
                  {cls.status === null ? (
                    <td>
                      {" "}
                      <button className="btn  bg-red-600  text-white ">
                        {" "}
                        pending
                      </button>{" "}
                    </td>
                  ) : (
                    <td>
                      {" "}
                      <button className="btn  bg-green-600  text-white ">
                        {" "}
                        pending
                      </button>{" "}
                    </td>
                  )}
                  <td>
                    {" "}
                    <button
                      onClick={() => handleDelete(cls)}
                      className="btn  bg-red-600  text-white"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setUpdateData(cls), window.my_modal_2.showModal();
                      }}
                      className="btn bg-green-600 text-white"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box" onSubmit={handleUpdate}>
          <label className="mx-4 font-semibold textColor">Class Name</label>
          <input
            className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
            type="text"
            name="className"
            defaultValue={updateData.className}
            placeholder={updateData.className}
          />
          <label className="mx-4 font-semibold textColor">Price</label>
          <input
            className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
            type="number"
            name="price"
            defaultValue={updateData.price}
            placeholder={updateData.price}
          />
          <label className="mx-4 font-semibold textColor">
            Available Seats{" "}
          </label>
          <input
            className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
            type="number"
            name="seats"
            defaultValue={updateData.seats}
            placeholder={updateData.seats}
          />
          <button className="btn w-full bgColor text-white my-2">Update</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Classes;

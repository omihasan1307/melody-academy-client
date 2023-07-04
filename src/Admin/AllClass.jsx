import { useContext, useState } from "react";
import useAllClasses from "../hooks/useAllClasses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const AllClass = () => {
  const { users } = useContext(AuthContext);
  const [classes, refetch, isLoading] = useAllClasses();
  // const [deny, setDeny] = useState({});
  // console.log("dd", deny);

  const handleDelete = (_id) => {
    console.log("object", _id._id);
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
          .delete(`http://localhost:5000/allClasses/${_id._id}`, { _id })
          .then((res) => {
            refetch();
            if (res) {
              Swal.fire("Deleted!", "Your class has been deleted.", "success");
            }
          });
      }
    });
  };

  const handleApprove = (approve) => {
    console.log(approve);
    axios
      .patch(
        `http://localhost:5000/updateStatus/${approve._id}?email=${users?.email}`,
        {
          status: "approved",
        },
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
  };

  const handleDeny = (deny) => {
    console.log("deny", deny);
  };

  return (
    <div>
      <div className="bgColor ">
        <h5 className="text-white text-center text-2xl font-bold py-20">
          ALL CLASSES
        </h5>
      </div>
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
                <th>Image</th>
                <th>Class Name</th>
                <th>Instructor Name</th>
                <th>Instructor Email</th>
                <th>Available seats</th>
                <th>price</th>
                <th>Status</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-left ">
              {classes.map((cls, index) => (
                <tr key={index} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <div className="avatar">
                      <div className="w-12 rounded-lg">
                        <img src={cls?.photo} />
                      </div>
                    </div>
                  </td>
                  <td>{cls.className}</td>
                  <td>{cls.name}</td>
                  <td>{cls.email}</td>
                  <td>{cls.seats}</td>
                  <td>${cls.price}</td>

                  <td>
                    {" "}
                    {cls.status === "approved" ? (
                      <button className="btn bgColor text-white">
                        Approved
                      </button>
                    ) : cls.status === "deny" ? (
                      "denied"
                    ) : (
                      <p className="textColor font-bold text-base">
                        pending...
                      </p>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleApprove(cls)}
                      disabled={
                        cls.status === "approved" ||
                        (cls.status === "deny" && true)
                      }
                      className={`btn text-white ${
                        cls.status === "approved" || cls.status === "deny"
                          ? "bg-gray-400"
                          : "bg-green-800"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        () => handleDeny(cls), window.my_modal_2.showModal();
                      }}
                      disabled={
                        cls.status === "approved" ||
                        (cls.status === "deny" && true)
                      }
                      className={`btn text-white ${
                        cls.status === "approved" || cls.status === "deny"
                          ? "bg-gray-400"
                          : "bg-green-800"
                      }`}
                    >
                      Deny
                    </button>
                  </td>

                  <td>
                    {" "}
                    <button
                      onClick={() => handleDelete(cls)}
                      className="btn  bg-red-600  text-white"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <label className="mx-4 font-semibold textColor">Status</label>
          <input
            className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
            type="text"
            name="status"
            defaultValue="deny"
            readOnly
          />
          <label className="mx-4 font-semibold textColor">FeedBack</label>
          <input
            className="bg-slate-100 w-full border shadow px-5 py-2 rounded my-2 bg-none focus:outline-none"
            type="text"
            name="feedback"
            placeholder="Give FeedBack"
          />
          <button className="btn w-full bgColor text-white my-2">Submit</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AllClass;

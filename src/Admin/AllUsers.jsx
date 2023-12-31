import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUsers from "../hooks/useUsers";
import {
  faCheck,
  faEdit,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const [user, refetch, isLoading] = useUsers();
  const [roled, setRole] = useState("");
  console.log("user", user);
  const handleDelete = (user) => {
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
            `https://summer-camp-server-three-gamma.vercel.app/users/${user._id}`,
            {
              user,
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

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const role = form.role.value;

    axios
      .patch(
        `https://summer-camp-server-three-gamma.vercel.app/users/${roled}`,
        {
          role: role,
        }
      )
      .then((data) => {
        refetch();
        console.log(data);
      });
  };
  return (
    <div>
      <div className="bgColor ">
        <h5 className="text-white text-center text-2xl font-bold py-20">
          ALL USERS
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>{" "}
            <tbody>
              {user.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-3xl">
                        <img src={user?.photoURL} />
                      </div>
                    </div>
                  </td>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <div className="btn  bgColor  text-white">Admin</div>
                    ) : (
                      <>
                        {user._id === roled ? (
                          <div>
                            <form onSubmit={handleForm}>
                              <select
                                name="role"
                                className="border rounded px-2 border-pink-900"
                              >
                                <option value="admin">Admin</option>
                                <option value="instructor">Instructor</option>
                              </select>

                              <button className=" mx-2 border px-2 rounded-lg bg-green-600 text-white">
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                            </form>
                            <button
                              onClick={() => setRole("")}
                              className=" mx-2 border px-2 rounded-lg bg-red-600 text-white "
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                          </div>
                        ) : (
                          <div className="btn  bg-pink-800  text-white">
                            {user.role}
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-ghost bg-red-600  text-white"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                  <td>
                    {user.role === "student" ? (
                      <button
                        onClick={() => setRole(user._id)}
                        className="btn btn-ghost bg-green-600  text-white"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    ) : (
                      "Can't update"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;

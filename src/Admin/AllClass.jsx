import React, { useState } from "react";
import useAllClasses from "../hooks/useAllClasses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const AllClass = () => {
  const [classes, refetch, isLoading] = useAllClasses();
  const [approve, setApprove] = useState("");
  console.log("approve", approve);

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

                  <td> pending </td>
                  <td>
                    {" "}
                    <button
                      onClick={() => setApprove(cls)}
                      className="btn bg-green-800 text-white"
                    >
                      Approve
                    </button>{" "}
                    <button className="btn bg-red-800 text-white">Deny</button>{" "}
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
    </div>
  );
};

export default AllClass;

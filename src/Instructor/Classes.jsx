import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClasses from "../hooks/useClasses";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Classes = () => {
  const [classData, isLoading, refetch] = useClasses();
  console.log("object", classData);

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
          .delete(`http://localhost:5000/manageClasses/${_id._id}`, { _id })
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
              </tr>
            </thead>
            <tbody className="text-left ">
              {classData.map((cls, index) => (
                <tr key={index} className="hover">
                  <td>{index + 1}</td>
                  <td>{cls.className}</td>
                  <td>{cls.price}</td>
                  <td>{cls.seats}</td>
                  <td>0 (students)</td>
                  <td>... </td>
                  {cls.status === null ? (
                    <td className="btn  bg-red-600  text-white "> pending </td>
                  ) : (
                    <td className="btn bg-green-600  text-white "> pending </td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Classes;

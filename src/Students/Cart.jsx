import React, { useContext } from "react";
import useUserCart from "../hooks/useUserCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const Cart = () => {
  const { users } = useContext(AuthContext);
  const [cart, refetch, isLoading] = useUserCart();
  console.log(cart);
  const handleDelete = (item) => {
    console.log(item);
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
          .delete(`http://localhost:5000/cart/${item._id}`, { item })
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
        <div className="grid lg:grid-cols-6 gap-10 mx-10 lg:mx-5">
          <div className="col-span-4">
            {" "}
            {cart.map((cart) => (
              <div key={cart._id} className="lg:flex my-5">
                <div className=" border ">
                  <img
                    className="w-full h-[200px] lg:w-[300px] lg:h-[150px] object-cover rounded "
                    src={cart?.item?.photo}
                    alt=""
                  />
                </div>
                <div className="flex justify-between items-center w-full lg:my-0 my-5 lg:ms-10">
                  <div>
                    <h2 className="textColor font-bold text-xl">
                      {cart?.item?.className}
                    </h2>
                    <h2 className=" mt-2 text-base">
                      Instructor : {cart?.item?.name}
                    </h2>
                    <h2 className=" mt-2 text-base">
                      Instructor Email : {cart?.item?.email}
                    </h2>
                    <h2 className=" mt-2 text-base">
                      price : ${cart?.item?.price}
                    </h2>
                  </div>

                  <div>
                    <button
                      onClick={() => handleDelete(cart)}
                      className="btn btn-ghost bg-red-600  text-white"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-2 border">2</div>
        </div>
      )}
    </div>
  );
};

export default Cart;

import { useContext } from "react";
import useUserCart from "../hooks/useUserCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch, isLoading] = useUserCart();
  console.log("cart", cart);
  const totalPrice = cart.reduce((sum, item) => sum + item?.price, 0);

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
        <>
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-6 lg:gap-10 mx-10 lg:mx-5 my-8">
              <div className="col-span-4 ">
                .....
                {cart.map((cart) => (
                  <div key={cart._id} className="lg:flex my-5">
                    <div className=" border ">
                      <img
                        className="w-full h-[200px] lg:w-[300px] lg:h-[150px] object-cover rounded "
                        src={cart?.photo}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center w-full lg:my-0 my-5 lg:ms-10">
                      <div>
                        <h2 className="textColor font-bold text-xl">
                          {cart?.className}
                        </h2>
                        <h2 className=" mt-2 text-base">
                          Instructor : {cart?.name}
                        </h2>
                        <h2 className=" mt-2 text-base">
                          Instructor Email : {cart?.email}
                        </h2>
                        <h2 className=" mt-2 text-base">
                          price : ${cart?.price}
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
              <div className="col-span-2 border lg:mt-0 mt-5 h-[280px]">
                <h1 className="text-center my-5 text-2xl textColor font-bold ">
                  Order Summary
                </h1>
                <hr className="w-80 mx-auto " />
                <h1 className="mx-10 mt-5 text-xl">
                  Total Item : {cart.length}
                </h1>
                <h1 className="mx-10 mt-5 text-xl">
                  Total Bill : ${totalPrice}
                </h1>
                <div className="w-[80%] bgColor text-center text-white py-2 my-5 rounded mx-10">
                  <Link to="payment">Process to Checkout</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center my-10 text-2xl font-bold textColor">
              {" "}
              Empty Cart.....
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;

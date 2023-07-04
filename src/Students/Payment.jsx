import { Link } from "react-router-dom";
import useUserCart from "../hooks/useUserCart";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart, refetch, isLoading] = useUserCart();
  console.log("cart", cart);
  const totalPrice = cart.reduce((sum, item) => sum + item?.item?.price, 0);
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-ring loading-lg text-secondary mx-auto "></span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-10 mx-1">
          <div>
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
                </div>
              </div>
            ))}
          </div>

          <div className=" border lg:mt-0 mt-5 h-[300px] ">
            <h1 className="text-center my-5 text-2xl textColor font-bold ">
              Pay Your Bill
            </h1>
            <hr className="w-80 mx-auto " />
            <div className=" mx-auto">
              <div className="flex justify-between items-center w-[90%] mx-auto">
                <h1 className="mx-10 mt-5 text-xl border px-6 py-4 bg-gray-100">
                  Total Item : {cart.length}
                </h1>
                <h1 className="mx-10 mt-5 text-xl border px-6 py-4 bg-gray-100">
                  Total Bill : ${totalPrice}
                </h1>
              </div>
              <div>
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;

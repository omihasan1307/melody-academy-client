import React from "react";
import usePayment from "../hooks/usePayment";

const Enroll = () => {
  const [paymentInfo, refetch, isLoading] = usePayment();
  console.log("paymentInfo", paymentInfo);
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-ring loading-lg text-secondary mx-auto "></span>
        </div>
      ) : (
        <div>
          <div>
            <div>
              {paymentInfo?.map((item) => (
                <div key={item._id}>
                  <p>
                    {item.cartItem.map((e) => (
                      <div key={e._id} className="flex ">
                        <div className="my-5">
                          <img className="w-[400px] rounded" src={e.photo} />
                        </div>
                        <div className="flex  w-full items-center justify-between">
                          <div className="mx-5 my-8">
                            <h2 className="text-xl font-bold textColor">
                              {e.className}
                            </h2>
                            <h2 className="mt-1">create : {e.create}</h2>
                            <h2 className="mt-1">instructor : {e.name}</h2>
                            <h2 className="mt-1">email : {e.email}</h2>
                            <h2 className="mt-1">price : {e.price}</h2>
                          </div>
                          <div>
                            <h2> User Email : {item.email}</h2>
                            <h2 className="mt-1">
                              {" "}
                              Transaction ID : {item.transactionId}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enroll;

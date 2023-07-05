import usePayment from "../hooks/usePayment";

const PaymentHistory = () => {
  const [paymentInfo, refetch, isLoading] = usePayment();
  console.log("paymentInfo", paymentInfo);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Dates </th>
              <th>Order Items</th>
              <th>Transaction ID</th>
              <th>Payable Amount</th>
              <th>Card Type</th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            {paymentInfo?.map((item) => (
              <tr key={item._id}>
                <td>{item.create}</td>
                <td>
                  {item.cartItem.map((e) => (
                    <td key={e._id} className="flex">
                      {e.className}
                    </td>
                  ))}
                </td>
                <td>{item.transactionId}</td>

                <td>{item.price}</td>
                <td>{item.card}</td>
                <td>
                  {paymentInfo ? (
                    <p className="text-green-600 font-semibold">paid</p>
                  ) : (
                    <p className="text-red-600 font-semibold">unpaid</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Checkout = ({ price, cart }) => {
  const { users } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();
  const create = moment().format("MMMM Do YYYY, h:mm:ss a");

  useEffect(() => {
    axios
      .post("http://localhost:5000/create-payment-intent", { price })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: users?.displayName || "anonymous",
            email: users?.email || "unknown email",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    } else {
      axios
        .post(
          `http://localhost:5000/payment?email=${users?.email}`,
          {
            transactionId: paymentIntent.id,
            name: users?.displayName,
            email: users?.email,
            cartItem: cart,
            create,
            price,
            card: paymentMethod.card.brand,
          },
          {
            headers: {
              authorization: localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          enqueueSnackbar(`Hi ${users?.displayName}, Your Payment done `, {
            variant: "success",
          });
          navigate("/");
          console.log(res.data);
        });
    }
  };

  return (
    <div className="w-[80%]  my-5 rounded mx-auto ">
      <form onSubmit={handleSubmit}>
        <div className="border py-2 rounded ">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className="w-full bgColor text-center text-white py-2 my-5 rounded mx-auto  "
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && (
        <p className="text-red-700 font-bold my-5 text-center">{cardError}</p>
      )}
    </div>
  );
};

export default Checkout;

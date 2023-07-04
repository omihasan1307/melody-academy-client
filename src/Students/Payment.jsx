import useUserCart from "../hooks/useUserCart";

const Payment = () => {
  const [cart, refetch, isLoading] = useUserCart();
  console.log("cart", cart);
  const totalPrice = cart.reduce((sum, item) => sum + item?.item?.price, 0);
  return (
    <div>
      <h1>payment</h1>
    </div>
  );
};

export default Payment;

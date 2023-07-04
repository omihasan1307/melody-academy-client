import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserCart = () => {
  const { users, loading } = useContext(AuthContext);

  const {
    refetch,
    data: cart = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", users?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/cart?email=${users?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );
      return response.data;
    },
  });
  return [cart, refetch, isLoading];
};

export default useUserCart;

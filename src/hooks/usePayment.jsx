import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePayment = () => {
  const { users, loading } = useContext(AuthContext);

  const {
    data: paymentInfo,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["payment", users?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axios.get(
        `https://summer-camp-server-three-gamma.vercel.app/payment?email=${users?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );
      return response.data;
    },
  });
  return [paymentInfo, refetch, isLoading];
};

export default usePayment;

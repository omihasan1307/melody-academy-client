import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useUsers = () => {
  const { users, loading } = useContext(AuthContext);

  const {
    refetch,
    data: user = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", users?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axios.get(
        `https://summer-camp-server-three-gamma.vercel.app/users?email=${users?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );

      return response.data;
    },
  });
  return [user, refetch, isLoading];
};
export default useUsers;

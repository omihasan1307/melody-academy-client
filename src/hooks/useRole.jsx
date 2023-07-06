import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { users, loading } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", users?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://summer-camp-server-three-gamma.vercel.app/role?email=${users?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );

      return res.data;
    },
  });

  return [role, isLoading];
};

export default useRole;

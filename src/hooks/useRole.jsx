import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { users, loading } = useContext(AuthContext);
  console.log(users);

  const { data: role } = useQuery({
    queryKey: ["role", users?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/role?email=${users?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );
      return res.data;
    },
  });
  console.log(role);
  return [role];
};

export default useRole;

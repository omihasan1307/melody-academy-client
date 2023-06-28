import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useUsers = () => {
  const { users } = useContext(AuthContext);

  const { refetch, data: user = [] } = useQuery({
    queryKey: ["users", users?.email],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/users?email=${users?.email}`
      );
      return response.data;
    },
  });
  return [user, refetch];
};
export default useUsers;

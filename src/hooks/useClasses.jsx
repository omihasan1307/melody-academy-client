import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useClasses = () => {
  const { users, loading } = useContext(AuthContext);
  const {
    data: classData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageClasses", users?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/manageClasses?email=${users?.email}`
      );
      return res.data;
    },
  });
  return [classData, isLoading, refetch];
};

export default useClasses;

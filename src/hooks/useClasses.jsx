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
    queryKey: ["instructorClass"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/instructorClass?email=${users?.email}`
      );

      return res.data;
    },
  });
  console.log("object", classData);
  return [classData, isLoading, refetch];
};

export default useClasses;

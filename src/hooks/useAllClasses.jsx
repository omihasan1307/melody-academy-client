import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllClasses = () => {
  const { loading } = useContext(AuthContext);

  const {
    refetch,
    data: classes = [],
    isLoading,
  } = useQuery({
    queryKey: ["allClasses"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/allClasses`);
      return response.data;
    },
  });

  return [classes, refetch, isLoading];
};

export default useAllClasses;

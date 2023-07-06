import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMangeClasses = () => {
  const { users, loading } = useContext(AuthContext);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["manageClasses", users?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axios.get(
        `https://summer-camp-server-three-gamma.vercel.app/manageClasses?email=${users?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );
      return response.data;
    },
  });
  return [data, refetch, isLoading];
};

export default useMangeClasses;

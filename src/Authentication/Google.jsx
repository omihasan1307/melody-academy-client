import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const Google = () => {
  const { googleProvider } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleProvider()
      .then((res) => {
        const user = res.user;
        console.log(user);
        const { displayName, email, photoURL, uid } = res.user;
        axios.post("http://localhost:5000/users", {
          displayName,
          email,
          photoURL,
          uid,
          role: "student",
        });
        enqueueSnackbar(`Hi ${user?.displayName}, Welcome to Melody Academy `, {
          variant: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full text-xl font-semibold bgColor text-white py-2 rounded"
      >
        Google
      </button>
    </div>
  );
};

export default Google;

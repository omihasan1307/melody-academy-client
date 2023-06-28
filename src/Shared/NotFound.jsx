import { Link } from "react-router-dom";
import notFound from "../img/404 Error-bro.png";

const NotFound = () => {
  return (
    <div className=" ">
      <img className="w-[45%] mx-auto " src={notFound} alt="" />

      <div className="flex justify-center -mt-12">
        {" "}
        <Link to="/" className="bgColor px-4 py-2 rounded text-white ">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";

const PopularInstructor = () => {
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/popularInstructor`).then((data) => {
      setInstructor(data.data);
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Melody Academy || Instructor</title>
      </Helmet>
      {!instructor ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-ring loading-lg text-secondary mx-auto "></span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-20  my-5 mx-5 lg:mx-0">
          {instructor?.map((cls) => (
            <Fade key={cls._id}>
              <div className="border px-8 py-10 rounded-xl">
                <div className=" rounded-3xl">
                  <img
                    className="lg:object-cover w-full lg:w-[300px] h-[200px] rounded-xl mx-auto"
                    src={cls?.photoURL}
                    alt=""
                  />
                </div>
                <div className="mt-5">
                  <h2 className="text-xl font-bold textColor">
                    {cls.className}
                  </h2>
                  <h2 className="text-normal  mt-2">
                    Instructor Name : {cls.displayName}
                  </h2>
                  <h2 className="text-normal  mt-2">
                    Instructor Email : {cls.email}
                  </h2>
                  <h2 className="text-normal  mt-2">Role : {cls.role}</h2>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularInstructor;

import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import cover2 from "../../img/cover2.png";
import cover1 from "../../img/cover1.png";
import cover3 from "../../img/cover3.png";

const Banner = () => {
  return (
    <div className="mb-10 ">
      <Carousel
        dynamicHeight={"false"}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
      >
        <div className="min-h-90 grid grid-cols-2 p-10 lg:p-20  ">
          <div className=" text-left my-auto">
            <div>
              <p className="text-xl lg:text-2xl font-bold">
                Welcome to the
                <span className=" normal-case lg:text-2xl  textColor ">
                  {""} Melody World
                </span>
              </p>
              <h1 className="text-base lg:text-2xl my-3 ">
                The language of music is common to all generations and nations;
                it is understood by everybody, since it is understood with the
                heart.
              </h1>
              <Link to="/classes">
                <button className="bgColor text-white px-4 py-2 outline-none rounded">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="w-3/4 mx-auto  ">
            <img
              className="w-full h-full object-contain "
              src={cover1}
              alt=""
            />
          </div>
        </div>
        <div className="min-h-90 grid grid-cols-2 p-10 lg:p-20  ">
          <div className=" text-left my-auto">
            <div>
              <p className="text-xl lg:text-2xl font-bold">
                Welcome to the
                <span className=" normal-case lg:text-2xl  textColor ">
                  {""} Melody World
                </span>
              </p>
              <h1 className="text-base lg:text-2xl my-3 ">
                Music deserves to be the mandatory second language of all
                schools in the world.
              </h1>
              <Link to="/classes">
                <button className="bgColor text-white px-4 py-2 outline-none rounded">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="w-3/4 mx-auto  ">
            <img className="w-full" src={cover2} alt="" />
          </div>
        </div>
        <div className="min-h-90 grid grid-cols-2 p-10 lg:p-20  ">
          <div className=" text-left my-auto">
            <div>
              <p className="text-xl lg:text-2xl font-bold">
                Welcome to the
                <span className=" normal-case lg:text-2xl  textColor ">
                  {""} Melody World
                </span>
              </p>
              <h1 className="text-base lg:text-2xl my-3 ">
                Music is a more potent instrument than any other for education
                because rhythm and harmony find their way into the inward places
                of the soul.
              </h1>
              <Link to="/classes">
                <button className="bgColor text-white px-4 py-2 outline-none rounded">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="w-3/4 mx-auto  ">
            <img className="w-full" src={cover3} alt="" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

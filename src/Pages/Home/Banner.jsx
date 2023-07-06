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
            <div className=" ">
              <p className="text-xl lg:text-2xl">Be Strong</p>
              <h1 className="text-base lg:text-3xl my-3">
                Discover a musical journey with our carousel <br /> showcasing
                the vibrant melodies and harmonies of Melody Academy.
              </h1>

              <Link to="/">
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
            <div className=" ">
              <p className="text-xl lg:text-2xl">Be Strong</p>
              <h1 className="text-base lg:text-3xl my-3">
                Discover a musical journey with our carousel <br /> showcasing
                the vibrant melodies and harmonies of Melody Academy.
              </h1>

              <Link to="/">
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
            <div className=" ">
              <p className="text-xl lg:text-2xl">Be Strong</p>
              <h1 className="text-base lg:text-3xl my-3">
                Discover a musical journey with our carousel <br /> showcasing
                the vibrant melodies and harmonies of Melody Academy.
              </h1>

              <Link to="/">
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

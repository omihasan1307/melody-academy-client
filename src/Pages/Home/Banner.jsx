import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import cover2 from "../../img/cover2.png";
import cover1 from "../../img/cover1.png";
import cover3 from "../../img/cover3.png";

const Banner = () => {
  return (
    <div className="text-black mb-10 ">
      <Carousel
        dynamicHeight={"false"}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
      >
        <div className="min-h-90 flex items-center justify-between p-10 lg:p-20 border ">
          <div className="text-center lg:text-left ">
            <div className="border ">
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
          <div className=" lg:w-[40%] border ">
            <img className="object" src={cover1} alt="" />
          </div>
        </div>

        {/* <div className="min-h-90 bg-slider2 bg-center bg-no-repeat bg-cover flex items-center justify-between p-10 lg:p-20">
          <div className="text-left">
            <p className="text-orange text-2xl">Be Strong</p>
            <h1 className="text-3xl lg:text-5xl my-3">
              Make Yourself Stronger
              <br />
              Than Your Excuses.
            </h1>
            <Link to="/">
              <button className="bgColor text-white px-4 py-2 outline-none rounded">
                Get Started
              </button>
            </Link>
          </div>
          <div className="lg:w-[50%]">
            <img className="" src={cover2} alt="" />
          </div>
        </div>

        <div className="min-h-90 bg-slider3 bg-center bg-no-repeat bg-cover flex items-center justify-between p-10 lg:p-20">
          <div className="text-left ">
            <p className="text-orange text-2xl my-3">Be Strong</p>
            <h1 className="text-3xl lg:text-5xl my-5">
              Make Yourself Stronger
              <br />
              Than Your Excuses.
            </h1>
            <Link to="/">
              <button className="bgColor text-white px-4 py-2 outline-none rounded">
                Get Started
              </button>
            </Link>
          </div>
          <div className="lg:w-[50%] border ">
            <img className=" " src={cover3} alt="" />
          </div>
        </div> */}
      </Carousel>
    </div>
  );
};

export default Banner;

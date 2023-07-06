import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";

const Review = () => {
  const data = [
    {
      name: "Aria Stark",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum iusto quas suscipit atque debitis voluptatem deserunt ipsa quae modi",
    },
    {
      name: "Jhon Snow",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum iusto quas suscipit atque debitis voluptatem deserunt ipsa quae modi",
    },
    {
      name: "David Deo",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum iusto quas suscipit atque debitis voluptatem deserunt ipsa quae modi",
    },
    {
      name: "Alex rose",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum iusto quas suscipit atque debitis voluptatem deserunt ipsa quae modi",
    },
  ];
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Fade>
        <h2 className="textColor text-4xl font-bold text-center my-10">
          Review
        </h2>
      </Fade>
      <Slider {...settings}>
        {data.map((e, index) => (
          <div key={index} className="mx-20 my-10">
            <div className="bg-base-100 p-8 mx-5 rounded-xl text-center border-r-4 border-l-4 border-pink-500 w-2/3 h-52 my-5">
              <p>
                <span className="font-bold textColor">{e.name} - </span>
                {e.review}
              </p>

              <p className="my-3">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400  mx-2"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mx-2"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mx-2"
                />
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Review;

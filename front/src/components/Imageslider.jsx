import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ImageSlider = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const slide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="">
      <div className="relative overflow-hidden rounded">
        <div className="">
          {banners.map((ele, index) => (
            <Link to="/" key={index} className="cursor-pointer">
              <img
                src={ele.image.url}
                alt={`Slide ${index}`}
                className={`w-full object-cover h-56 sm:h-96 lg:h-100 2xl:h-120 ${
                  index === currentIndex ? "block" : "hidden"
                } `}
              />
              <div
                className={`absolute z-30 text-white left-1/2 bottom-5 -translate-x-1/2 text-center ${
                  index === currentIndex ? "block" : "hidden"
                }`}
              >
                <h2 className="lg:text-4xl text-2xl text-black font-bold hidden sm:block">
                  {ele.heading}
                </h2>
                <p className="hidden text-xl font-semibold text-black sm:block">
                  {ele.content}
                </p>
                <div className="flex justify-center my-2 space-x-4">
                  {banners.map((e, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => slide(idx)}
                      className="w-3 h-3 bg-white rounded-full"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2  text-black px-4 py-2 rounded-l"
          onClick={prevSlide}
        >
          <FaArrowAltCircleLeft size={30} />
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black px-4 py-2 rounded-r"
          onClick={nextSlide}
        >
          <FaArrowAltCircleRight size={30} />
        </button>
        <div className="absolute top-2/3 ml-auto right-auto text-white"></div>
      </div>
    </div>
  );
};

export default ImageSlider;

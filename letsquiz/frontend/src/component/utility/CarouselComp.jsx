import { useCallback, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import swal from "sweetalert";
import axios from "axios";
import { baseUrl, banner } from "../../constants/apiUrl";
import "../../assets/css/Home.css";
import { Link } from "react-router-dom";

const SLIDER_TIME = 9000;

const CarouselComp = () => {

  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setLoading(false);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setLoading(false);
  }, [banners, currentIndex]);

  useEffect(() => {
    const id = setTimeout(nextSlide, SLIDER_TIME);
    return () => clearTimeout(id);
  }, [currentIndex, nextSlide]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const fetchBanners = async () => {
    try {
      const res = await axios.get(baseUrl + banner.getAllBanner);
      setBanners(res.data);
      console.log(banners);
      
      setLoading(true);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
      swal("Error", "There was an error fetching the data!", "error");
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8900); // Adjust the delay time as needed
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative flex h-full w-full max-w-full overflow-hidden rounded-3xl bg-black text-white">
      {banners.length > 0 && (
        <>
          <img
            src={banners[currentIndex].image}
            className={`absolute h-[35svh] w-full object-cover object-center blur-[.5px] brightness-[.75] duration-500 md:h-[85svh]`}
            alt="carousel"
          />
          <div
            className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2
           -translate-y-1/2  cursor-pointer items-center justify-between rounded-full text-2xl text-transparent text-white   duration-300 md:p-2"
          >
            <div className="w-fit rounded-full opacity-[0.7]  duration-200 hover:opacity-100 hover:backdrop-blur-lg">
              <BsChevronCompactLeft
                onClick={prevSlide}
                size={30}
                className="opacity-[0.5] duration-200 hover:opacity-100 hover:backdrop-blur-lg "
              />
            </div>
            <div className="h-fit w-fit  rounded-full opacity-[0.7] duration-200 hover:opacity-100 hover:backdrop-blur-lg ">
              <BsChevronCompactRight
                onClick={nextSlide}
                size={30}
                className="h-fit w-fit opacity-[0.5] hover:opacity-100 hover:backdrop-blur-lg"
              />
            </div>
          </div>
          <Link
          to={banners[currentIndex]?.relatedlink}
          className="absolute left-[84%]  top-[70%] flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-lg border-2 border-[#0086E6] px-4 text-2xl text-[#0086E6] opacity-[0.5] duration-300  gap-5 hover:opacity-100 hover:backdrop-blur-lg w-56 ">
            Explore now{" "}
            <div>
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.458879 19.5598C0.165059 19.2778 0 18.8954 0 18.4967C0 18.098 0.165059 17.7157 0.458879 17.4337L8.21692 9.99092L0.458879 2.54815C0.173386 2.26457 0.0154123 1.88476 0.0189838 1.49052C0.0225544 1.09629 0.187384 0.719168 0.47797 0.44039C0.768557 0.161613 1.16165 0.00348282 1.57259 5.72205e-05C1.98352 -0.00336838 2.37942 0.148186 2.67501 0.422075L11.5411 8.92789C11.8349 9.20985 12 9.59222 12 9.99092C12 10.3896 11.8349 10.772 11.5411 11.054L2.67501 19.5598C2.3811 19.8416 1.98253 20 1.56695 20C1.15136 20 0.752788 19.8416 0.458879 19.5598Z"
                  fill="#0086E6"
                />
              </svg>
            </div>
          </Link>
          <div className="absolute left-1/2 top-[90%] flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full text-2xl text-transparent text-white opacity-[0.5] duration-300 hover:opacity-100 hover:backdrop-blur-lg md:p-2">
            <div className="flex items-center justify-center gap-1">
              {banners.map(
                (slide, slideIndex) =>
                  loading && (
                    <div
                      key={slideIndex}
                      className={`loading-container duration-200 ${
                        slideIndex === currentIndex ? "w-10" : "w-3"
                      } `}
                    >
                      {slideIndex === currentIndex && (
                        <div className="loading"></div>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="top-4 flex justify-center py-2">
            {banners.map((slide, slideIndex) => (
              <div
                key={`dot-${slideIndex}`}
                onClick={() => goToSlide(slideIndex)}
                className={`cursor-pointer text-2xl ${
                  slideIndex === currentIndex
                    ? "text-white"
                    : "text-transparent"
                }`}
              >
                ●
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CarouselComp;

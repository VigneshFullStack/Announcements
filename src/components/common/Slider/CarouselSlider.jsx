import React, { useState, useEffect } from "react";
import "../../../styles/components/CarouselSlider.scss";
import Loader from "../Loader/Loader";
import { formatDateIntoString } from "../../../utils/multipleDateFomats";
import { useSelector, useDispatch } from "react-redux";
import { getSlides } from "../../../features/slideSlice.js";

const CarouselSlider = () => {
  const dispatch = useDispatch();
  const [autoPlayIntervalSeconds, setAutoPlayIntervalSeconds] = useState(5);
  const { slides, loading, error } = useSelector((state) => state.slides);
  const [classNameVal, setClassName] = useState(" img-bg-style");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch slides on mount
  useEffect(() => {
    dispatch(getSlides());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoPlayIntervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [slides, autoPlayIntervalSeconds]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleClick = (e) => {
    const slideWidth = e.currentTarget.offsetWidth;
    const clickPosition =
      e.clientX - e.currentTarget.getBoundingClientRect().left;
    setCurrentIndex((prevIndex) =>
      clickPosition > slideWidth / 2
        ? (prevIndex + 1) % slides.length
        : (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const visibleDotsCount = 3;
  const halfVisibleDots = Math.floor(visibleDotsCount / 2);

  const start = Math.max(0, currentIndex - halfVisibleDots);
  const end = Math.min(slides.length, currentIndex + halfVisibleDots + 1);

  const dots = Array.from({ length: slides.length }, (_, index) => index).slice(
    start,
    end
  );

  const validImageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "tiff",
    "ico",
    "svg",
    "pdf",
  ];

  const validVideoExtensions = [
    "mp4",
    "webm",
    "ogg",
    "avi",
    "mov",
    "wmv",
    "flv",
    "mkv",
    "mpeg",
    "mpg",
    "3gp",
  ];

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        {slides.length === 0 && <Loader />}

        {slides.map((slide, index) => {
          const fileExtension = slide?.imagePath
            ?.split(".")
            .pop()
            .toLowerCase();
          const isValidImage = validImageExtensions.includes(fileExtension);
          const isValidVideo = validVideoExtensions.includes(fileExtension);
          const imagePath = `${process.env.REACT_APP_RedirectURI}${
            slide?.imagePath?.split("\\").pop() || "path/to/default-image.jpg"
          }`;

          return (
            <div
              key={index}
              className={`slide ${
                index === currentIndex ? "active" : ""
              }${classNameVal}`}
              style={{
                backgroundImage: isValidImage ? `url(${imagePath})` : "none",
              }}
              onClick={handleClick}
            >
              {isValidVideo && !isValidImage && (
                <video
                  className="background-video"
                  autoPlay
                  muted
                  loop
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <source src={imagePath} type={`video/${fileExtension}`} />
                  Your browser does not support the video tag.
                </video>
              )}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  color: "white",
                  zIndex: 10,
                }}
              ></div>
            </div>
          );
        })}

        {slides.length > 1 && (
          <div className="dots">
            {dots.map((index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselSlider;

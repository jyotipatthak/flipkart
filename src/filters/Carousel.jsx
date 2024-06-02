import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Array of image URLs for the carousel
const images = [
  "/a.webp",
  "/b.webp",
  "/c.webp",
  "/d.webp",
  "/e.jpg",
];

const ImageCarousel = () => {
  // Settings for the react-slick carousel
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,  // Custom next arrow component
    prevArrow: <SamplePrevArrow />,  // Custom previous arrow component
  };

  return (
    <div className="w-full top-0">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index}`} className="w-full h-60" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom next arrow component
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-opacity-50 rounded-full p-2`}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
};

// Custom previous arrow component
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-opacity-50 rounded-full p-2`}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

export default ImageCarousel;

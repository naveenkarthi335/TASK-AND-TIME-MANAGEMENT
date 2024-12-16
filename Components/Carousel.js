import React from 'react';
import Slider from 'react-slick';
import { styled } from '@mui/material/styles';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '.slick-slide img': {
    width: '100%',
    borderRadius: '12px',
  },
  '.slick-dots': {
    bottom: '10px',
  },
  '.slick-dot': {
    backgroundColor: '#007bff',
    '&.slick-active': {
      backgroundColor: '#0056b3',
    },
  },
}));

const Carousel = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <StyledSlider {...settings}>
      {items.map((item, index) => (
        <div key={index} className="carousel-slide">
          <img src={item.imgSrc} alt={item.altText} />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </StyledSlider>
  );
};

export default Carousel;

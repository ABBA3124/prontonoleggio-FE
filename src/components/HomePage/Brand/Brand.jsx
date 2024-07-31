import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Brand.css"
import LogoBrand1 from "./img/01.png"
import LogoBrand2 from "./img/02.png"
import LogoBrand3 from "./img/03.png"
import LogoBrand4 from "./img/04.png"
import LogoBrand5 from "./img/05.png"
import LogoBrand6 from "./img/06.png"

const Brand = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="brand-carousel-container">
      <Slider {...settings} className="carousel">
        <div className="carousel-item">
          <img src={LogoBrand1} alt="Brand Logo 1" className="" />
        </div>
        <div className="carousel-item">
          <img src={LogoBrand2} alt="Brand Logo 2" className="" />
        </div>
        <div className="carousel-item">
          <img src={LogoBrand3} alt="Brand Logo 3" className="" />
        </div>
        <div className="carousel-item">
          <img src={LogoBrand4} alt="Brand Logo 4" className="" />
        </div>
        <div className="carousel-item">
          <img src={LogoBrand5} alt="Brand Logo 5" className="" />
        </div>
        <div className="carousel-item">
          <img src={LogoBrand6} alt="Brand Logo 6" className="" />
        </div>
      </Slider>
    </div>
  )
}

export default Brand

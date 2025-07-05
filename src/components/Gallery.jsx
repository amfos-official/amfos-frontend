import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "./ImageSlider.css"
import { IoIosArrowBack } from "react-icons/io";
import gsap from 'gsap';

const imageArray = [
  "/Assets/slider_images/img1.jpg",
  "/Assets/slider_images/img2.jpg",
  "/Assets/slider_images/img3.jpg",
  "/Assets/slider_images/img4.jpg",
  "/Assets/slider_images/img5.jpg",
  "/Assets/slider_images/img6.jpg",
  "/Assets/slider_images/img7.jpg",
  "/Assets/slider_images/img8.jpg",
  "/Assets/slider_images/img9.jpg",
  "/Assets/slider_images/img10.jpg",
  "/Assets/slider_images/img11.jpg",
  "/Assets/slider_images/img12.jpg",
  "/Assets/slider_images/img13.jpg",
  "/Assets/slider_images/img14.jpg"
];

const Gallery = ({ padding }) => {

  const [midImage, setMidImage] = useState(0);
  const [rightImage, setRightImage] = useState(1);
  const [leftImage, setLeftImage] = useState(imageArray.length - 1);

  useEffect(() => {
    if (midImage == 0) {
      setLeftImage(imageArray.length - 1)
      setRightImage(1);
    }
    else if (midImage == imageArray.length - 1) {
      setRightImage(0);
      setLeftImage(midImage - 1);
    }
    else {
      setRightImage(midImage + 1);
      setLeftImage(midImage - 1);
    }

  }, [midImage]);

  const Increment = () => {
    if (midImage == imageArray.length - 1) {
      setMidImage(0);
    }
    else {
      setMidImage(midImage + 1);
    }
    //----------------GSAP ANIMATIONS-------------------------
    gsap.fromTo('.middleImage',
      { x: -200, opacity: 0, scale: 0.6 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5 }
    );
    gsap.fromTo('.rightImage',
      { x: 600, opacity: 0, scale: 0.6 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5 }
    );
    gsap.fromTo('.leftImage',
      { x: -500, opacity: 0, scale: 0.6 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5 }
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      Increment();
    }, 1500);
    return () => clearInterval(interval);
  }, [midImage]);

  const Decrement = () => {
    if (midImage == 0) {
      setMidImage(imageArray.length - 1);
    }
    else {
      setMidImage(midImage - 1);
    }
    //----------------GSAP ANIMATIONS-------------------------
    gsap.fromTo('.middleImage',
      { x: 200, opacity: 0, scale: 0.6 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5 }
    );
    gsap.fromTo('.rightImage',
      { x: 600, opacity: 0, scale: 0.6 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5 }
    );
    gsap.fromTo('.leftImage',
      { x: -500, opacity: 0, scale: 0.6 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5 }
    );
  }

  return (

    <div className="bg-[#F3F4F6]">
      <div
        className=" flex flex-col"
        style={{ paddingTop: "98px", paddingLeft: padding, paddingRight: padding }}
      >
        <p className="text-xs font-bold uppercase underline text-[#1E3A8A]">GALLERY</p>
        <h1
          className="lalezar text-5xl lg:text-7xl font-extrabold text-[#111827]"
          style={{ marginBottom: "60px" }}
        >
          Our expertise—visually.
        </h1>
      </div>

      <div className="ImageSlider "  >
        <div className="ImageSliderContainter">
          <div className="Images">
            <img src={imageArray[rightImage]} className="rightImage h-[110px] w-[80px] md:h-[230px] md:w-[150px]" />
            <img src={imageArray[midImage]} className="middleImage h-[210px] md:h-[350px]" />
            <img src={imageArray[leftImage]} className="leftImage h-[110px] w-[80px] md:h-[230px] md:w-[150px]" />
          </div>
        </div>
        <div className="buttons">
          <button className="leftButton" onClick={() => Decrement()}><IoIosArrowBack />
          </button>
          <button className="rightButton" onClick={() => Increment()}><IoIosArrowBack />
          </button>
        </div>
        <div className="dotsPlace">
          {
            imageArray.map((_, index) => (
              <div key={index} className={`dots ${index === midImage ? 'active' : 'passive'}`}></div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Gallery;
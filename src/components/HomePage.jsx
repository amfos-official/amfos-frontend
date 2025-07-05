import React, { useState, useEffect, useRef } from "react";

const HomePage = ({ padding }) => {
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState(false);
  const animationTimeoutRef = useRef(null);
  const animationIntervalRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes flash {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0; }
      }
      .animate-flash {
        animation: flash 1s ease;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!hovered) {
      setAnimate(true);
      animationIntervalRef.current = setInterval(() => {
        setAnimate(true);
        animationTimeoutRef.current = setTimeout(() => {
          setAnimate(false);
        }, 1000);
      }, 4000);
    } else {
      setAnimate(false);
      clearInterval(animationIntervalRef.current);
      clearTimeout(animationTimeoutRef.current);
    }
    return () => {
      clearInterval(animationIntervalRef.current);
      clearTimeout(animationTimeoutRef.current);
    };
  }, [hovered]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="relative h-screen w-full">
      <div id="overlay" className="absolute z-[-5] h-full w-full bg-[#00000055]"></div>
      <video
        src="/Assets/bg-vid1.mp4"
        muted
        autoPlay
        loop
        playsInline
        className="absolute -z-10 h-full w-full object-cover object-[20%]"
      ></video>

      <div
        className="h-full w-full  text-[#F3F4F6]"
        style={{ paddingLeft: padding, paddingRight: padding }}
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="h-12 md:h-24"> </div>
          <h1 className="text-4xl text-center drop-shadow-[4px_4px_6px_#111827] sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl mb-4">
            Accounting Firm in New Town
          </h1>
          <p
            className="text-sm text-center sm:text-xl drop-shadow-[4px_4px_6px_#111827]  font-semibold max-w-3xl "
            style={{ marginTop: "12px" }}
          >
            GSTIN - 19CRNPM9888G1ZO
          </p>
          <p
            className="text-lg text-center sm:text-xl drop-shadow-[4px_4px_6px_#111827] md:text-2xl font-semibold max-w-3xl mb-2"
          >
            Accounting Firm, Bookkeeping and Tax Services
          </p>

          <button
            className="relative border-2 border-orange-500 drop-shadow-[4px_4px_6px_#111827] text-orange-500 font-bold rounded hover:bg-orange-500 hover:text-[#F3F4F6] active:bg-orange-500 active:text-[#F3F4F6] transition duration-300 ml-140-lg"
            style={{ marginTop: "60px", padding: "12px 24px" }}
          >
            <a href="#contact" className="cursor-pointer">
              {" "}
              Get in touch
            </a>
            <div className="absolute -right-24 top-13 leading-tight transform -rotate-12">
              <img
                src="/Assets/Curly Arrow.png"
                className="absolute -left-10 -top-4"
                alt=""
              />
              <p className="cta w-[70px] text-[#F3F4F6] text-center">
                Start the conversation
              </p>
            </div>
          </button>

          <div
            className="flex flex-col self-start gap-2"
            style={{ marginTop: "40px" }}
          >
            <div className="text-sm sm:text-base font-semibold drop-shadow-[4px_4px_6px_#111827] whitespace-nowrap">
              Available throughout India
            </div>
            <a target="_blank" href="https://g.page/r/CXF8ZckLwq7SEAE/review">
              <div className=" flex items-center  h-[50px]">
                <div className="relative -right-1  flex items-center">
                  <img
                    src="/Assets/review1.png"
                    alt="User 1"
                    className="relative w-6 h-6 rounded-full border-1 border-[#F3F4F6]"
                  />
                  <img
                    src="/Assets/review2.png"
                    alt="User 2"
                    className="relative -left-2 w-6 h-6 rounded-full border-1 border-[#F3F4F6]"
                  />
                  <img
                    src="/Assets/review3.png"
                    alt="User 3"
                    className="relative -left-4 w-6 h-6 rounded-full border-1 border-[#F3F4F6]"
                  />
                </div>
                <span
                  className={`text-sm sm:text-base font-semibold drop-shadow-[4px_4px_6px_#111827] flex gap-2 items-center ${animate ? "animate-flash" : ""
                    }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src="/Assets/rating.png" className="w-[80px]" alt="" />
                  5.0/5
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

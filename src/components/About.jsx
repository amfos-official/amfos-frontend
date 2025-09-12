import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const About = ({ padding }) => {
  const [pulseAnimating, setPulseAnimating] = useState(true);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }
      .animate-pulse {
        animation: pulse 3s infinite;
        animation-play-state: running;
      }
      .animate-pulse.paused {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePulseMouseEnter = () => {
    setPulseAnimating(false);
  };

  const handlePulseMouseLeave = () => {
    setPulseAnimating(true);
  };

  return (
    <>
      <div id="about" className="bg-[#F3F4F6] flex flex-col" style={{ paddingTop: "98px", paddingLeft: padding, paddingRight: padding }}>
        <p className="text-xs font-bold uppercase underline text-[#1E3A8A] ">ABOUT</p>
        <h1 className="lalezar text-5xl lg:text-7xl font-extrabold text-[#111827]" style={{ marginBottom: "60px" }}>Who We Are</h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between text-[#111827] text-base font-normal leading-relaxed">
          <div className="md:w-[50%]  left">
            <p className="montserrat  lg:text-[20px]">
              We provide our clients with solutions to help them grow their business. The success of our Firm is based on the strength of our client relationships.
            </p>
            <p className="mt-2 montserrat  lg:text-[20px]">
              We in AMFOS are a team of skilled tax consultants and accountants dedicated to making your financial journey smooth. Whether you're an individual, freelancer, or business, we handle ITR, TDS, GST, audits, notices, and more—with care and clarity.
            </p>
          </div>
          <div className="md:w-[40%] flex flex-col justify-between">
            <p className="lg:text-[20px] montserrat">
              Whether you're filing ITR, managing GST/ TDS, or handling audits – we make tax compliance simple and stress-free.
            </p>
            <a
              href="#contact"
              className={`underline font-semibold text-[#111827] hover:text-[#1E3A8A] transition duration-300 w-max montserrat ${pulseAnimating ? "animate-pulse" : "animate-pulse paused"
                }`}
              onMouseEnter={handlePulseMouseEnter}
              onMouseLeave={handlePulseMouseLeave}
            >
              Get Started &rarr;
            </a>
          </div>
        </div>



      </div>
      <Marquee className="bg-[#F3F4F6]" speed={100} direction="left" pauseOnHover style={{ paddingTop: "60px" }}>
        <p className="lalezar marquee-text tracking-wide text-[62px] md:text-[108px] overflow-hidden">The AM Financial Online Shoppe&nbsp;&nbsp;&nbsp;</p>
      </Marquee>

      <div className="bg-[#F3F4F6] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-20 pt-12" style={{ paddingLeft: "clamp(32px, 5vw, 96px)", paddingRight: "clamp(32px, 5vw, 96px)" }}>
        <img src="/assets/img21.png" alt="Serving Our Community" className="w-full md:w-1/2 max-w-[600px] h-48 md:h-96 rounded-lg object-[right_top] object-cover" />
        <div className="w-full md:w-1/2 text-[#111827]">
          <h2 className="lalezar text-4xl font-extrabold mb-6">Serving Our Community</h2>
          <p className="montserrat text-lg leading-relaxed">
            Our family-owned account service has been serving the community for the last 10 years. Our team has grown and includes experienced CA's and dedicated support to provide both personal and professional financial services.
          </p>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="bg-[#F3F4F6] pt-12" style={{ paddingLeft: padding, paddingRight: padding }}>
        <h2 className="lalezar text-4xl font-extrabold text-[#111827] mb-8 text-center">Our Team</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24">
          {/* Person 1 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/assets/team1.jpg" alt="Person 1" className="w-40 drop-shadow-[4px_4px_6px_#111827] h-40 rounded-full object-cover mb-4" />
            <h3 className="text-xl font-semibold montserrat text-[#111827]">Areful Mallick</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          {/* Person 2 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/assets/team2.jpg" alt="Person 2" className="w-40 h-40 rounded-full drop-shadow-[4px_4px_6px_#111827] object-cover object-top mb-4" />
            <h3 className="text-xl font-semibold montserrat text-[#111827]">Niwaz Mallick</h3>
            <p className="text-gray-600">Associate</p>
          </div>
          {/* Person 3 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/assets/team3.jpg" alt="Person 3" className="w-40 h-40 drop-shadow-[4px_4px_6px_#111827] rounded-full object-cover mb-4" />
            <h3 className="text-xl font-semibold montserrat text-[#111827]">Nayedul Alam</h3>
            <p className="text-gray-600">Associate</p>
          </div>
          {/* Person 4 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/assets/team4.jpg" alt="Person 4" className="w-40 h-40 drop-shadow-[4px_4px_6px_#111827] rounded-full object-top object-cover mb-4" />
            <h3 className="text-xl font-semibold montserrat text-[#111827]">Mohd Usman</h3>
            <p className="text-gray-600">Associate</p>
          </div>
          {/* Person 5 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/assets/team5.jpg" alt="Person 5" className="w-40 h-40 drop-shadow-[4px_4px_6px_#111827] rounded-full object-top object-cover mb-4" />
            <h3 className="text-xl font-semibold montserrat text-[#111827]">Nur Mahammad</h3>
            <p className="text-gray-600">Associate</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default About;

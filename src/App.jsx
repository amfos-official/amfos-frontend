import "./App.css"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar";
import About from "./components/About";
import { useState, useEffect } from "react";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import Appointment from "./components/Appointment";
import Payment from "./components/Payment";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";

import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Footer from "./components/Footer";
import TaxUpdate from "./components/TaxUpdate";

const App = () => {

  const [navslider, setNavslider] = useState("-200%");

  function navdown() {
    setNavslider(0);
  }
  function navup() {
    setNavslider("-200%");
  }

  const padding = "clamp(32px, 5vw, 96px)";

  return (
    <>
      <Router>
        {/*
          Move NavHashLink inside Router so hooks can be used
        */}
        <NavHashLinkWrapper padding={padding} navslider={navslider} navup={navup} navdown={navdown} />
      </Router>
    </>
  );
};


const NavHashLinkWrapper = ({ padding, navslider, navup, navdown }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navBackground, setNavBackground] = useState(false);

  // Custom NavHashLink component to handle navigation and scrolling
  const NavHashLink = ({ to, className, children }) => {
    const handleClick = (e) => {
      e.preventDefault();
      if (location.pathname === "/") {
        // Already on home page, just scroll
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page and then scroll after navigation
        navigate("/", { state: { scrollToId: to } });
      }
    };

    return (
      <a href={`#${to}`} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  };

  useEffect(() => {
    // Function to handle scroll event on homepage
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    if (location.pathname === "/") {
      // On homepage, add scroll listener
      window.addEventListener("scroll", handleScroll);
      // Set initial background based on scroll position
      handleScroll();

      // Scroll to element if scrollToId is present in location state
      if (location.state && location.state.scrollToId) {
        const element = document.getElementById(location.state.scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        // Clear scrollToId from history state to prevent repeated scrolling
        window.history.replaceState({}, document.title);
      }
    } else {
      // On other pages, always show background
      setNavBackground(true);
    }

    // Cleanup scroll listener on unmount or path change
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, location.state]);

  const ghostHost =
    '/taxupdates';

  return (
    <>
      <Loader />
      <div id="full-nav" className={`lg:hidden z-10 montserrat text-[#F3F4F6] flex flex-col gap-6 justify-center fixed transform transition-transform duration-300 ease-out w-screen h-screen bg-[#10B981]`} style={{ paddingLeft: padding, paddingRight: padding, transform: `translateY(${navslider})` }}>

        <div id="menu-close" onClick={navup} className="absolute drop-shadow-[4px_4px_6px_#111827] right-10 top-8 cursor-pointer lg:hidden">
          <img src="/assets/Multiply.png" alt="" className="h-10" />
        </div>

        <div onClick={navup} className="flex flex-col gap-8 text-[32px]">

          <NavHashLink to="about" className=" hover:underline drop-shadow-[4px_4px_6px_#111827]  hover:text-[#F97316] active:text-[#F97316]  font-semibold">About</NavHashLink>
          <NavHashLink to="services" className=" hover:underline drop-shadow-[4px_4px_6px_#111827] hover:text-[#F97316] active:text-[#F97316] font-semibold">Services</NavHashLink>
          <a
            href={ghostHost}
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-[28px] font-semibold flex items-center gap-3 hover:underline hover:text-[#F97316]"
          >
            Tax Updates
            <span className="text-sm bg-[#F97316] text-white px-2 py-0.5 rounded-full animate-pulse">
              NEW
            </span>
          </a>
          <NavHashLink to="appointment" className=" hover:underline drop-shadow-[4px_4px_6px_#111827] hover:text-[#F97316] active:text-[#F97316] font-semibold">Book an Appointment</NavHashLink>
          <NavHashLink to="payment" className="text-[24px]  drop-shadow-[4px_4px_6px_#11182784] font-semibold">
            <button className="bg-[#F97316]   px-3 py-1 rounded font-semibold">
              Pay Your Bill
            </button>

          </NavHashLink>
        </div>

        <div id="contacts" className="text-[16px] mt-8">
          <p>support@amfos.in</p>
          <p>+91 90643 63937, 033 6618 3035</p>
        </div>

        <div id="contact-icons" onClick={navup} className="flex gap-2">
          <a target="_blank" href="https://www.facebook.com/share/19DB33dsgy/?mibextid=wwXIfr"><img src="/assets/Facebook.png" alt="" /></a>
          <a target="_blank" href="https://www.instagram.com/auditor_kolkata?igsh=NzJpaGV3dGttYXR0&utm_source=qr"><img src="/assets/Instagram.png" alt="" /></a>
          <a target="_blank" href="https://wa.me/message/A6GFQ75HVR63G1"><img src="/assets/WhatsApp.png" alt="" /></a>
          <a target="_blank" href="https://x.com/ArefulM"><img src="/assets/X.png" alt="" /></a>
          <a target="_blank" href="https://www.linkedin.com/in/arefulmallickcaintermediate?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><img src="/assets/LinkedIn.png" alt="" /></a>
          <a target="_blank" href="https://t.me/Areful_Mallick"><img src="/assets/Telegram.png" alt="" /></a>
          <a target="_blank" href="https://maps.app.goo.gl/HKdw5vSgWDSxCYcq5?g_st=iwb"><img src="/assets/google_maps.png" alt="" /></a>
        </div>

      </div>

      <div id="navbar" className={`z-5 fixed top-0 w-screen h-[10vh] text-[#F3F4F6] flex justify-between items-center transition-colors duration-300`} style={{ paddingLeft: padding, paddingRight: padding, backgroundColor: navBackground ? '#10B981' : 'transparent' }}>
        <a href="/" id="brand" className="flex justify-center gap-2 items-center">
          <img src="/assets/LogoFinal.jpg" alt="" className="max-h-[52px] h-[4vh] min-h-[32px]" />
          <h1 className="mochiy drop-shadow-[4px_4px_6px_#111827]" style={{ fontSize: "clamp(20px,3vw ,24px)" }}> AMFOS</h1>
        </a>

        <div id="menu" className="hidden lg:flex montserrat text-[#F3F4F6] items-center justify-center gap-8">

          <NavHashLink to="about" className="text-[20px] drop-shadow-[4px_4px_6px_#111827] hover:underline  hover:text-[#F97316] focus:text-[#F97316]  font-semibold">About</NavHashLink>
          <NavHashLink to="services" className="text-[20px] hover:underline  drop-shadow-[4px_4px_6px_#111827] hover:text-[#F97316] focus:text-[#F97316] font-semibold">Services</NavHashLink>
          <a
            href={ghostHost}
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-[20px] font-semibold hover:underline drop-shadow-[4px_4px_6px_#111827] hover:text-[#F97316] focus:text-[#F97316] flex items-center gap-2"
          >
            Tax Updates
            <span className="text-xs bg-[#F97316] text-white px-2 py-0.5 rounded-full animate-pulse">
              NEW
            </span>
          </a>
          <NavHashLink to="appointment" className="text-[20px] hover:underline drop-shadow-[4px_4px_6px_#111827] hover:text-[#F97316] focus:text-[#F97316] font-semibold">Book an Appointment</NavHashLink>
          <NavHashLink to="payment" className="text-[16px]  font-semibold">
            <button className="bg-[#f97416e4] hover:bg-[#f97416] text-[#F3F4F6]  drop-shadow-[4px_4px_6px_#11182784] cursor-pointer px-3 py-1 rounded font-semibold">
              Pay Your Bill
            </button>
          </NavHashLink>
        </div>

        <div id="menu-small" onClick={navdown} className="cursor-pointer drop-shadow-[4px_4px_6px_#111827] lg:hidden">
          <img src="/assets/Menu.png" alt="" className="h-10" />
        </div>

      </div>

      <Routes>
        <Route path="/" element={
          <>
            <HomePage padding={padding} />
            <About padding={padding} />
            <Services padding={padding} />
            <Gallery padding={padding} />
            <Appointment padding={padding} />
            <Payment padding={padding} />
            <TaxUpdate padding={padding} />
            <Contact padding={padding} />
          </>
        } />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer padding={padding} />
    </>
  );
};


export default App;

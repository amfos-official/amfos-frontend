import React from "react";
import Swal from 'sweetalert2'

import { sendEmail } from "../utils/email";

const Contact = ({ padding }) => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const object = Object.fromEntries(formData);

    const res = await sendEmail(object);

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully",
        icon: "success"
      });
      // Clear form fields after success
      event.target.reset();
    }
  }

  return (
    <>
      <div
        id="contact"
        className="bg-[#F3F4F6]"
        style={{ paddingLeft: padding, paddingRight: padding, paddingTop: "98px" }}
      >
        <div className=" max-w-7xl flex flex-col lg:flex-row ">
          {/* Left side - Contact info */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase underline text-[#1E3A8A] ">CONTACT</p>
            <h1 className="lalezar text-5xl lg:text-7xl font-extrabold text-[#111827]" style={{ marginBottom: "60px" }}>
              Get in touch
            </h1>
            <p className="text-lg text-[#111827] montserrat" style={{ marginBottom: "20px" }}>
              Have questions? We’re just a message away.
            </p>

            <div className="flex items-center gap-3 montserrat" style={{ marginBottom: "10px" }}>
              <img src="/assets/envelope-solid.svg" alt="Email" className="w-6 h-6 text-[#F97316]" />
              <a href="mailto:support@amfos.in" className="text-[#111827] underline hover:text-[#F97316]">
                support@amfos.in
              </a>
            </div>

            <div className="flex items-center gap-3 montserrat" style={{ marginBottom: "20px" }}>
              <img src="/assets/phone-solid.svg" alt="Phone" className="w-6 h-6 text-[#F97316]" />
              <span className="text-[#111827]">+91 90643 63937, 033 6618 3035</span>
            </div>

            <div className="flex items-center gap-3 text-[#F97316] text-2xl" style={{ marginBottom: "30px" }}>
              <a href="https://www.facebook.com/share/19DB33dsgy/?mibextid=wwXIfr" target="_blank" aria-label="Facebook" rel="noreferrer">
                <img src="/assets/Facebook.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/auditor_kolkata?igsh=NzJpaGV3dGttYXR0&utm_source=qr" target="_blank" aria-label="Instagram" rel="noreferrer">
                <img src="/assets/Instagram.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a target="_blank" href="https://x.com/ArefulM" aria-label="X" rel="noreferrer">
                <img src="/assets/X.png" alt="X" className="w-6 h-6" />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/arefulmallickcaintermediate?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" aria-label="linkedIn" rel="noreferrer">
                <img src="/assets/LinkedIn.png" alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a href="https://t.me/Areful_Mallick" target="_blank" aria-label="telegram" rel="noreferrer">
                <img src="/assets/Telegram.png" alt="telegram" className="w-6 h-6" />
              </a>
              <a target="_blank" href="https://wa.me/message/A6GFQ75HVR63G1" aria-label="whatsapp" rel="noreferrer">
                <img src="/assets/WhatsApp.png" alt="whatsapp" className="w-6 h-6" />
              </a>
              <a target="_blank" href="https://maps.app.goo.gl/HKdw5vSgWDSxCYcq5?g_st=iwb" aria-label="google maps" rel="noreferrer">
                <img src="/assets/google_maps.png" alt="google maps" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="flex-1 montserrat" style={{ marginBottom: "20px" }}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-2"
              method="POST"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="border border-gray-400 rounded text-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                required
                style={{ padding: "3px 6px" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-gray-400 rounded text-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                required
                style={{ padding: "3px 6px" }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="border border-gray-400 rounded  text-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                style={{ padding: "3px 6px" }}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                className="border border-gray-400 rounded  text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                required
                style={{ padding: "3px 6px" }}
              />
              <button
                type="submit"
                className="self-start border cursor-pointer border-[#F97316] text-[#F97316]  rounded hover:bg-[#F97316] hover:text-white transition"
                style={{ padding: "8px 24px", marginTop: "8px" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>


      </div>
    </>
  );
};

export default Contact;

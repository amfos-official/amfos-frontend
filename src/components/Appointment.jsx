'use client'

import React, { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2';
import { sendEmail } from "../utils/email";
import axios from "axios";

const Appointment = ({ padding }) => {
  const [showBookingOptions, setShowBookingOptions] = useState(false);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState("30"); // default 30 mins

  // New states for animation control
  const [animate, setAnimate] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const animationTimeoutRef = useRef(null);
  const animationIntervalRef = useRef(null);


  // Removed localStorage persistence effects

  useEffect(() => {
    if (showSchedulePopup || showPaymentPopup || loading) {
      // Disable scrolling if any popup is open or loading
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSchedulePopup, showPaymentPopup, loading]);

  // Inject CSS for "tada" animation
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes tada {
        0% { transform: scale3d(1, 1, 1) rotate(0); }
        10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate(-3deg); }
        30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate(3deg); }
        40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate(-3deg); }
        100% { transform: scale3d(1, 1, 1) rotate(0); }
      }
      .animate-tada {
        animation: tada 1s ease;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Animation effect logic
  useEffect(() => {
    if (clicked) {
      // Stop animation if clicked
      setAnimate(false);
      clearInterval(animationIntervalRef.current);
      clearTimeout(animationTimeoutRef.current);
      return;
    }

    if (!hovered) {
      // Start animation interval if not hovered and not clicked
      setAnimate(true);
      animationIntervalRef.current = setInterval(() => {
        setAnimate(true);
        // Remove animation class after animation duration (1s)
        animationTimeoutRef.current = setTimeout(() => {
          setAnimate(false);
        }, 1000);
      }, 3000);
    } else {
      // If hovered, stop animation
      setAnimate(false);
      clearInterval(animationIntervalRef.current);
      clearTimeout(animationTimeoutRef.current);
    }

    return () => {
      clearInterval(animationIntervalRef.current);
      clearTimeout(animationTimeoutRef.current);
    };
  }, [clicked, hovered]);

  const handleBookClick = () => {
    setShowBookingOptions(true);
    setClicked(true); // stop animation on click
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleSessionChange = (e) => {
    setSessionDuration(e.target.value);
  };

  const getPrice = () => {
    return sessionDuration === "60" ? 1000 : 500;
  };

  const getSessionLabel = () => {
    return sessionDuration === "60" ? "1 hr | ₹1000" : "30 mins | ₹500";
  };


  const handleScheduleClick = () => {
    setShowSchedulePopup(true);
  };

  const handleNextClick = () => {
    setShowSchedulePopup(false);
    setShowPaymentPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const closePopups = () => {
    setShowSchedulePopup(false);
    setShowPaymentPopup(false);
    setFormData({ name: "", email: "" });
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    const selectedTimeValue = e.target.value;
    if (selectedDate === new Date().toISOString().split("T")[0]) {
      const currentTime = new Date();
      const [hours, minutes] = selectedTimeValue.split(":").map(Number);
      if (hours < currentTime.getHours() || (hours === currentTime.getHours() && minutes <= currentTime.getMinutes())) {
        Swal.fire({
          title: "Invalid Time",
          text: "Please select a future time for today.",
          icon: "warning"
        });
        return;
      }
    }
    setSelectedTime(selectedTimeValue);
  };
  //payment setup
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () =>
        resolve(true);
      script.onerror = () =>
        resolve(false);
      document.body.appendChild(script);

    })
  }
  const onPayment = async (price) => {
    //create order
    try {
      setLoading(true);

      const options = {
        orderID: 1,
        amount: price
      }
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      console.log(baseURL);


      const { data } = await axios.post(`${baseURL}/api/createOrder`, options);

      const paymentObject = new (window).Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY,
        order_id: data.id,
        amount: data.amount,
        currency: data.currency,
        name: "AFMOS",
        description: "Income Tax Filing Appointment",
        handler: function (response) {
          setLoading(true);
          const paymentData = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature
          }
          axios.post(`${baseURL}/api/verifyPayment`, paymentData).then((res) => {
            if (res?.data?.success) {
              // After successful payment verification, save appointment details
              const appointmentData = {
                name: formData.name,
                email: formData.email,
                date: selectedDate,
                time: selectedTime
              };
              axios.post(`${baseURL}/api/saveAppointment`, appointmentData).then((saveRes) => {
                if (saveRes?.data?.success) {
                  // Show confirmation popup immediately after payment success
                  Swal.fire({
                    title: "Payment Successful!",
                    text: "Your appointment has been booked successfully.",
                    icon: "success"
                  }).then(() => {
                    setLoading(false);
                  });
                  closePopups();
                } else {
                  Swal.fire({
                    title: "Error",
                    text: "Payment succeeded but failed to save appointment details.",
                    icon: "error"
                  }).then(() => {
                    setLoading(false);
                  });
                }
              }).catch(() => {
                Swal.fire({
                  title: "Error",
                  text: "Payment succeeded but an error occurred while saving appointment details.",
                  icon: "error"
                }).then(() => {
                  setLoading(false);
                });
              });
            }
            else {
              Swal.fire({
                title: "Payment Failed",
                text: "Your payment was not successful. Please try again.",
                icon: "error"
              }).then(() => {
                setLoading(false);
              });
            }

          }).catch((err) => {
            Swal.fire({
              title: "Error",
              text: "An error occurred during payment verification.",
              icon: "error"
            }).then(() => {
              setLoading(false);
            });
          })
        },
      modal: {
        ondismiss: () => {
          Swal.fire({
            title: "Payment Cancelled",
            text: "You cancelled the payment.",
            icon: "info",
          }).then(() => {
            // Close payment popup and enable scrolling
            setShowPaymentPopup(false);
          });
        },
      },
      })
      paymentObject.open();
      setLoading(false);

    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "An error occurred during payment processing.",
        icon: "error"
      });
    }
  }

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
  }, [])


  return (
    <div id="appointment" className="bg-[#F3F4F6]" style={{ paddingLeft: padding, paddingRight: padding, paddingTop: "98px" }}>

      {loading && (
        <div className="fixed inset-0 bg-[#111827ae]  z-20 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
        </div>
      )}

      <p className="text-xs font-bold uppercase underline text-[#1E3A8A]">BOOK AN APPOINTMENT</p>
      <h1 className="lalezar text-5xl lg:text-7xl font-extrabold text-[#111827]" style={{ marginBottom: "60px" }}>
        Let’s Talk Taxes —
      </h1>
      <div className="flex flex-col md:flex-row md:items-center md:gap-52" style={{ paddingBottom: "0.5rem" }}>
        <div>
          <p className="montserrat text-[#111827]" style={{ marginBottom: "12px" }}>
            INCOME TAX FILING, GST, TDS, ADVANCE TAX, BOOK KEEPING, INVESTMENT
          </p>
          <p className="montserrat text-[#111827]" style={{ marginBottom: "24px" }} > 30 mins | ₹500  </p>
        </div>
        <div>
          {!showBookingOptions && (
            <button
              className={`cursor-pointer border border-orange-500 text-orange-500 rounded-md font-semibold hover:bg-orange-500 hover:text-white transition ${animate ? "animate-tada" : ""}`}
              style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
              onClick={handleBookClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              BOOK
            </button>
          )}
        </div>
      </div>

      {showBookingOptions && !showSchedulePopup && !showPaymentPopup && (
        <div className="flex flex-col md:flex-row md:items-center  gap-8 md:gap-4 " style={{ marginTop: "1rem" }}>
          <div className="relative  flex flex-col max-w-xs">
            <label className="absolute font-semibold text-gray-700 left-1.5 -top-6" >Choose Date</label>
            <input
              type="date"
              className="cursor-pointer border border-gray-300 rounded-md w-full"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleDateChange}
              style={{ padding: "0.5rem", }}
            />
          </div>

          <div className="relative flex flex-col max-w-xs">
            <label className="absolute -top-6 left-1.5 font-semibold text-gray-700" >Choose Slot</label>
            <select
              className="cursor-pointer border border-gray-300 rounded-md w-full"
              style={{ padding: "0.5rem" }}
              value={selectedTime}
              onChange={handleTimeChange}
            >
              <option value="">Select a time slot</option>
              {(() => {
                const now = new Date();
                const selectedDateObj = new Date(selectedDate);
                const isToday = selectedDateObj.toDateString() === now.toDateString();
                const timeSlots = [];
                for (let i = 9; i <= 22; i++) {
                  const hour = i;
                  const timeString = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                  const isPast = isToday && hour <= now.getHours();
                  if (!isPast) {
                    timeSlots.push(
                      <option key={timeString} value={timeString}>
                        {hour === 12 ? `12:00 PM` : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                      </option>
                    );
                  }
                }
                if (timeSlots.length === 0) {
                  Swal.fire({
                    title: "No Available Slots",
                    text: "Today is fully booked. Please book for tomorrow or another day.",
                    icon: "info"
                  }).then(() => {
                    setSelectedDate("");
                    setSelectedTime("");
                  });
                }
                return timeSlots.length > 0 ? timeSlots : null;
              })()}
            </select>
          </div>

          <div className="relative flex flex-col max-w-xs">
            <label className="absolute -top-6 left-1.5 font-semibold text-gray-700" >Session Duration</label>
            <select
              className="cursor-pointer border border-gray-300 rounded-md w-full"
              style={{ padding: "0.5rem" }}
              value={sessionDuration}
              onChange={handleSessionChange}
            >
              <option value="60">1 hr | ₹1000</option>
              <option value="30">30 mins | ₹500</option>
            </select>
          </div>

          <button
            className={`cursor-pointer border rounded-md font-semibold transition mt-2 md:mt-0 md:ml-4 md:w-auto w-full max-w-xs ${selectedDate && selectedTime
              ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              : "border-gray-400 text-gray-400 cursor-not-allowed"
              }`}
            style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            onClick={selectedDate && selectedTime ? handleScheduleClick : undefined}
            disabled={!(selectedDate && selectedTime)}
          >
            Schedule Meeting
          </button>
        </div>
      )}

      {/* Schedule Meeting Popup */}
      {showSchedulePopup && (
        <div className="fixed inset-0 bg-[#11182796] flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative" style={{ padding: "1.5rem", }}>
            <button
              className="absolute text-4xl top-4 right-6 text-gray-600 hover:text-gray-900"
              onClick={closePopups}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4" style={{ marginBottom: "1rem" }}>Enter Your Details</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700" style={{ marginBottom: "0.25rem" }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                  style={{ padding: "0.5rem", }}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700" style={{ marginBottom: "0.25rem" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                  style={{ padding: "0.5rem", }}
                />
              </div>
              <button
                type="button"
                className={` cursor-pointer px-4 py-2 rounded-md font-semibold transition ${formData.name && formData.email
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                style={{ padding: "0.5rem 1rem" }}
                onClick={formData.name && formData.email ? handleNextClick : undefined}
                disabled={!(formData.name && formData.email)}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-[#11182796]  flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative" style={{ padding: "1.5rem", }}>
            <button
              className="absolute text-4xl top-4 right-6 text-gray-600 hover:text-gray-900"
              onClick={closePopups}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4" style={{ marginBottom: "1rem" }}>Payment</h2>
            <p className="montserrat text-[#111827]" style={{ marginBottom: "12px" }}>
              {getSessionLabel()} - Pay now to confirm your consultation appointment.
            </p>
            <button
              type="button"
              className="cursor-pointer bg-green-600 text-white mt-4 px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition"
              onClick={() => onPayment(getPrice())}
            >
              Pay ₹{getPrice()}
            </button>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Appointment;

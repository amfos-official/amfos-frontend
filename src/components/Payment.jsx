import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Payment = ({ padding }) => {
    const [loading, setLoading] = useState(false);
    const [showAmountPopup, setShowAmountPopup] = useState(false);
    const [amount, setAmount] = useState("");

    // Load Razorpay script
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    // New useEffect to control scroll based on popup and loading state
    useEffect(() => {
        if (showAmountPopup || loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showAmountPopup, loading]);

    const closePopup = () => {
        setShowAmountPopup(false);
        setAmount("");
    };

    const handlePayClick = () => {
        setShowAmountPopup(true);
    };

    const handleAmountChange = (e) => {
        const val = e.target.value;
        // Allow only numbers
        if (/^\d*$/.test(val)) {
            setAmount(val);
        }
    };

    const onPayment = async (payAmount) => {
        if (!payAmount || Number(payAmount) <= 0) {
            Swal.fire({
                title: "Invalid Amount",
                text: "Please enter a valid amount greater than zero.",
                icon: "warning",
            });
            return;
        }

        try {
            setLoading(true);

            const options = {
                amount: Number(payAmount)
            };

            const baseURL = import.meta.env.VITE_API_BASE_URL;

            // Create order on backend
            const { data } = await axios.post(`${baseURL}/api/createOrder`, options);

            const paymentObject = new window.Razorpay({
                key: import.meta.env.VITE_RAZORPAY_KEY,
                order_id: data.id,
                amount: data.amount,
                currency: data.currency,
                name: "AFMOS",
                description: "Bill Payment",
                handler: function (response) {
                    setLoading(true);
                    const paymentData = {
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                    };
                    // Verify payment on backend
                    axios
                        .post(`${baseURL}/api/verifyPayment`, paymentData)
                        .then((res) => {
                            if (res?.data?.success) {
                                Swal.fire({
                                    title: "Payment Successful!",
                                    text: "Your payment has been processed successfully.",
                                    icon: "success",
                                }).then(() => {
                                    setLoading(false);
                                    closePopup();
                                });
                            } else {
                                Swal.fire({
                                    title: "Payment Failed",
                                    text: "Your payment was not successful. Please try again.",
                                    icon: "error",
                                }).then(() => {
                                    setLoading(false);
                                });
                            }
                        })
                        .catch(() => {
                            Swal.fire({
                                title: "Error",
                                text: "An error occurred during payment verification.",
                                icon: "error",
                            }).then(() => {
                                setLoading(false);
                            });
                        });
                },
                modal: {
                    ondismiss: () => {
                        Swal.fire({
                            title: "Payment Cancelled",
                            text: "You cancelled the payment.",
                            icon: "info",
                        }).then(() => {
                            // Close payment popup and enable scrolling
                            setShowAmountPopup(false);
                        });
                    },
                },
            });

            paymentObject.open();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: "An error occurred during payment processing.",
                icon: "error",
            });
        }
    };

    return (
        <div
            id="payment"
            className="bg-[#F3F4F6]"
            style={{ paddingLeft: padding, paddingRight: padding, paddingTop: "98px" }}
        >
            {loading && (
                <div className="fixed inset-0 bg-[#111827ae] z-20 flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
                </div>
            )}

            <p className="text-xs font-bold uppercase underline text-[#1E3A8A]">PAYMENT CORNER</p>
            <h1 className="lalezar text-5xl lg:text-7xl font-extrabold text-[#111827]" style={{ marginBottom: "25px" }}>
                Secure Payment
            </h1>
            <div className="flex flex-col md:flex-row md:items-center" style={{ paddingBottom: "0.5rem" }}>
                <div>
                    <p className="montserrat text-[#111827]" style={{ marginBottom: "28px" }}>
                        We receive digital payment
                    </p>
                    <button
                        className="cursor-pointer border border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition"
                        style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                        onClick={handlePayClick}
                    >
                        Pay your bill
                    </button>
                </div>
            </div>

            {showAmountPopup && (
                <div className="fixed inset-0 bg-[#11182796] flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative" style={{ padding: "1.5rem" }}>
                        <button
                            className="absolute text-4xl top-4 right-6 text-gray-600 hover:text-gray-900"
                            onClick={closePopup}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Enter amount of your bill</h2>
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                            className="border border-gray-300 rounded-md p-2 w-full mb-4"
                            autoFocus
                        />
                        <button
                            type="button"
                            className={`cursor-pointer rounded-md font-semibold transition w-full py-2 ${amount && Number(amount) > 0
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                }`}
                            onClick={() => onPayment(amount)}
                            disabled={!amount || Number(amount) <= 0}
                        >
                            Pay
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;

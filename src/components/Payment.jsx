import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Payment = ({ padding }) => {
    const [loading, setLoading] = useState(false);
    const [showAmountPopup, setShowAmountPopup] = useState(false);
    const [amount, setAmount] = useState("");
    const [paymentType, setPaymentType] = useState(""); // new
    const [upiQrUrl, setUpiQrUrl] = useState(""); // new

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
        setPaymentType("");
        setUpiQrUrl("");
    };

    const handlePayClick = () => {
        setShowAmountPopup(true);
    };

    const handleAmountChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            setAmount(val);
        }
    };

    // --- Razorpay payment ---
    const onGatewayPayment = async (payAmount) => {
        if (!payAmount || Number(payAmount) <= 0) {
            Swal.fire("Invalid Amount", "Please enter a valid amount greater than zero.", "warning");
            return;
        }
        try {
            setLoading(true);
            const baseURL = import.meta.env.VITE_API_BASE_URL;
            const { data } = await axios.post(`${baseURL}/api/createOrder`, { amount: Number(payAmount) });

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
                    axios
                        .post(`${baseURL}/api/verifyPayment`, paymentData)
                        .then((res) => {
                            if (res?.data?.success) {
                                Swal.fire("Payment Successful!", "Your payment has been processed successfully.", "success")
                                    .then(() => {
                                        setLoading(false);
                                        closePopup();
                                    });
                            } else {
                                Swal.fire("Payment Failed", "Your payment was not successful. Please try again.", "error")
                                    .then(() => setLoading(false));
                            }
                        })
                        .catch(() => {
                            Swal.fire("Error", "An error occurred during payment verification.", "error")
                                .then(() => setLoading(false));
                        });
                },
                modal: {
                    ondismiss: () => {
                        Swal.fire("Payment Cancelled", "You cancelled the payment.", "info")
                            .then(() => setShowAmountPopup(false));
                    },
                },
            });

            paymentObject.open();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "An error occurred during payment processing.", "error");
        }
    };

    // --- UPI QR Payment ---
    const onUpiPayment = (payAmount) => {
        if (!payAmount || Number(payAmount) <= 0) {
            Swal.fire("Invalid Amount", "Please enter a valid amount greater than zero.", "warning");
            return;
        }
        const encoded = encodeURIComponent(
            `upi://pay?pa=amfos@sbi&pn=The AM Financial Online Shoppe&am=${payAmount}&cu=INR`
        );
        const qr = `https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=${encoded}`;
        setUpiQrUrl(qr);
    };

    return (
        <div
            id="payment"
            className="bg-[#F3F4F6]"
            style={{ padding: padding }}
        >
            {loading && (
                <div className="fixed inset-0 bg-[#111827ae] z-20 flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
                </div>
            )}

            {/* <p className="text-xs font-bold uppercase underline text-[#1E3A8A]">PAYMENT CORNER</p> */}
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
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
                        <button
                            className="absolute text-4xl top-4 right-6 text-gray-600 hover:text-gray-900"
                            onClick={closePopup}
                            aria-label="Close"
                        >
                            &times;
                        </button>

                        {!paymentType && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Enter amount of your bill</h2>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="Enter amount"
                                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className={`w-1/2 rounded-md font-semibold py-2 transition ${amount && Number(amount) > 0
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                            }`}
                                        disabled={!amount || Number(amount) <= 0}
                                        onClick={() => {
                                            setPaymentType("gateway");
                                            onGatewayPayment(amount);
                                        }}
                                    >
                                        Pay via Gateway
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-1/2 rounded-md font-semibold py-2 transition ${amount && Number(amount) > 0
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                            }`}
                                        disabled={!amount || Number(amount) <= 0}
                                        onClick={() => {
                                            setPaymentType("upi");
                                            onUpiPayment(amount);
                                        }}
                                    >
                                        Pay via UPI
                                    </button>
                                </div>
                            </>
                        )}

                        {paymentType === "upi" && upiQrUrl && (
                            <div className="text-center mt-4">
                                <h2 className="text-xl font-semibold mb-4">Scan to Pay</h2>
                                <img src={upiQrUrl} alt="UPI QR" className="mx-auto" />
                                <p className="mt-2 text-sm text-gray-600">Use any UPI app to scan and pay</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;

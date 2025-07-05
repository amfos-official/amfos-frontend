import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ padding }) => {
    return (
        <footer className=" bg-[#10B981] text-white" style={{ paddingLeft: padding, paddingRight: padding, }}>

            <h2 className="font-bold text-2xl pt-6 mb-4">AMFOS</h2>
            < div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-42 md:items-start " >

                <div className="mb-6 md:mb-0">
                    <div className="flex gap-2 items-center">
                        <img src="/assets/location.png" alt="Location" className="w-6 h-6" />
                        <p>IRIS Building, Shop No. C, Near DPS Megacity,<br /> Mahammadpur, Kolkata - 700135</p>
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                        <img src="/assets/time.png" alt="Time" className="w-6 h-6" />
                        <div className="">

                            <p className="">
                                Mon - Fri:<br></br> 9:00 am - 10:00 pm</p>
                            <p className="mt-1">Sat - Sun:<br></br> By Appointment Only</p>

                        </div>

                    </div>
                </div>
                <div className="flex flex-wrap gap-8 text-sm">
                    <div className="flex flex-col space-y-4">
                        <Link to="/terms-and-conditions" className="hover:underline">Terms And Conditions</Link>
                        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    </div>

                </div>
            </div >
            <div className="text-center text-xs mt-8 pb-4">
                &copy; {new Date().getFullYear()} AMFOS. All rights reserved.
            </div>
        </footer >
    );
};

export default Footer;

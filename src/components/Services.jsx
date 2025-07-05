import React from "react";

const Services = ({ padding }) => {
  return (
    <div id="services" className="bg-[#F3F4F6] flex flex-col" style={{ paddingTop: "98px", paddingLeft: padding, paddingRight: padding }}>
      <p className="text-xs font-bold uppercase underline text-[#1E3A8A] ">SERVICES</p>
      <h1 className="lalezar  text-5xl lg:text-7xl font-extrabold text-[#111827]" style={{ marginBottom: "60px" }}>What We Do Best</h1>
      <div className="flex flex-wrap gap-4 montserrat">
        < a href="#appointment" className="border border-gray-400 rounded-full  text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Income Tax Filing
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          TDS
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          TCS
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          PF
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          ESIC
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          GST
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          ISO
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Trademark
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Professional Tax
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          <p> FSSAI (Food Licence / Registration)</p>
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Scoiety
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Trust
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          <p> Company Information (Public / Private)</p>
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          LLP
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          MSME
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Tax Audit
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Trade Licence
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Stock Audit
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          DSC (Digital Signature Certificate)
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Loan Projection
        </ a>

        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Statutory Audit
        </ a>
        < a href="#appointment" className="border border-gray-400 rounded-full     text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer hover:text-[#1E3A8A]" style={{ padding: "6px 18px" }}>
          Last 3 Year's ITR Return
        </ a>

      </div>

      {/* Three cards section */}
      <div className="flex flex-col md:flex-row gap-8 mt-12 max-w-[1200px] mx-auto">
        {/* Compliance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <img src="/Assets/img18.png" alt="Compliance" className="w-full h-48 md:h-62 object-[0_40%] rounded-lg object-cover mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-[#111827]">Compliance</h2>
          <ul className="list-disc list-inside text-[#111827] montserrat">
            <li><strong>Taxes:</strong> Personal, Business, and Corporate</li>
            <li><strong>Knowledgeable Local Sales Tax, GST</strong></li>
            <li>Legally Required Corporate Documentation and all compliances.</li>
          </ul>
        </div>

        {/* Management Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <img src="/Assets/img19.png" alt="Management" className="w-full h-48 md:h-62 object-[0_40%] rounded-lg object-cover mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-[#111827]">Management</h2>
          <ul className="list-disc list-inside text-[#111827] montserrat">
            <li><strong>Bookkeeping:</strong> manage daily transactions</li>
            <li><strong>Payroll:</strong> Management of payroll and taxes</li>
            <li><strong>Planning:</strong> Reporting and advice to support growth</li>
          </ul>
        </div>

        {/* Advisory Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <img src="/Assets/img20.png" alt="Advisory" className="w-full h-48 md:h-62 object-[40%_30%] rounded-lg object-cover mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-[#111827]">Advisory</h2>
          <ul className="list-disc list-inside text-[#111827] montserrat">
            <li><strong>Reporting:</strong> Help directors make informed decisions</li>
            <li><strong>Capital Fundraising:</strong> Advice on seeking equity to help grow your business</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Services;
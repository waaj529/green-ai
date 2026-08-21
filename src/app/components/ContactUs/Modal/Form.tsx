"use client";
import React, { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  phone_dial_code: string;
  phone_country_code: string;
  message: string;
  is_whatsapp_number: boolean;
  lead_type: number;
  login_from: number;
  source: number;
  csrfmiddlewaretoken: string;
}

// Countries with dial codes
const COUNTRIES = [
  { name: "Papua New Guinea", dial_code: "+675", code: "pg" },
  { name: "Australia", dial_code: "+61", code: "au" },
  { name: "Austria", dial_code: "+43", code: "at" },
  { name: "Belgium", dial_code: "+32", code: "be" },
  { name: "Brazil", dial_code: "+55", code: "br" },
  { name: "Canada", dial_code: "+1", code: "ca" },
  { name: "China", dial_code: "+86", code: "cn" },
  { name: "Denmark", dial_code: "+45", code: "dk" },
  { name: "Finland", dial_code: "+358", code: "fi" },
  { name: "France", dial_code: "+33", code: "fr" },
  { name: "Germany", dial_code: "+49", code: "de" },
  { name: "Greece", dial_code: "+30", code: "gr" },
  { name: "Hong Kong", dial_code: "+852", code: "hk" },
  { name: "India", dial_code: "+91", code: "in" },
  { name: "Indonesia", dial_code: "+62", code: "id" },
  { name: "Ireland", dial_code: "+353", code: "ie" },
  { name: "Israel", dial_code: "+972", code: "il" },
  { name: "Italy", dial_code: "+39", code: "it" },
  { name: "Japan", dial_code: "+81", code: "jp" },
  { name: "Mexico", dial_code: "+52", code: "mx" },
  { name: "Malaysia", dial_code: "+60", code: "my" },
  { name: "Netherlands", dial_code: "+31", code: "nl" },
  { name: "New Zealand", dial_code: "+64", code: "nz" },
  { name: "Norway", dial_code: "+47", code: "no" },
  { name: "Pakistan", dial_code: "+92", code: "pk" },
  { name: "Philippines", dial_code: "+63", code: "ph" },
  { name: "Poland", dial_code: "+48", code: "pl" },
  { name: "Portugal", dial_code: "+351", code: "pt" },
  { name: "Russia", dial_code: "+7", code: "ru" },
  { name: "Saudi Arabia", dial_code: "+966", code: "sa" },
  { name: "Singapore", dial_code: "+65", code: "sg" },
  { name: "South Africa", dial_code: "+27", code: "za" },
  { name: "South Korea", dial_code: "+82", code: "kr" },
  { name: "Spain", dial_code: "+34", code: "es" },
  { name: "Sweden", dial_code: "+46", code: "se" },
  { name: "Switzerland", dial_code: "+41", code: "ch" },
  { name: "Taiwan", dial_code: "+886", code: "tw" },
  { name: "Thailand", dial_code: "+66", code: "th" },
  { name: "Turkey", dial_code: "+90", code: "tr" },
  { name: "United Arab Emirates", dial_code: "+971", code: "ae" },
  { name: "United Kingdom", dial_code: "+44", code: "gb" },
  { name: "United States", dial_code: "+1", code: "us" },
  { name: "Vietnam", dial_code: "+84", code: "vn" },
];

const generateCaptcha = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(" ");
};

const Form = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    phone_dial_code: "+675",
    phone_country_code: "pg",
    message: "",
    is_whatsapp_number: false,
    lead_type: 329,
    login_from: 60,
    source: 82,
    csrfmiddlewaretoken: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Get CSRF token from meta tag or create a default one
    const getCsrfToken = () => {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (token) {
        setFormData((prev) => ({
          ...prev,
          csrfmiddlewaretoken: token,
        }));
      }
    };
    
    getCsrfToken();
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "phone_country") {
      // Handle country selection
      const selected = COUNTRIES.find(c => c.code === value);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          phone_dial_code: selected.dial_code,
          phone_country_code: selected.code,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Validate captcha
    if (captchaInput.replace(/\s/g, "") !== captcha.replace(/\s/g, "")) {
      setErrorMessage("Captcha verification failed. Please try again.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://app-gsolve.green.com.pg/submit/reach_us/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.Code === "001") {
        setSuccessMessage(data.Message || "Your enquiry has been submitted successfully!");
        // Reset form
        setFormData((prev) => ({
          ...prev,
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
          is_whatsapp_number: false,
        }));
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      } else {
        setErrorMessage(data.Message || "Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred while submitting the form."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    // Reset captcha when closing
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    onClose();
  };

  const renderContent = () => (
    <>
      {/* Main Content Layout */}
      <div className={`${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-[2fr_1.5fr] gap-4'}`}>
        {/* Mobile: Marketing Message First, Desktop: Form First */}
        {isMobile && (
          <div className="flex flex-col justify-center items-center text-center">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-green-600 italic mb-2">
                "Get in Touch"
              </h3>
              <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                Contact <span className="italic">GREEN</span> Today!
              </h2>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* First Row */}
            <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-2 gap-4'}`}>
              <div>
                <input
                  type="text"
                  name="firstname"
                  placeholder="FIRST NAME"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500`}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastname"
                  placeholder="LAST NAME"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="E-MAIL ID"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500`}
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <div className={`${isMobile ? 'space-y-2' : 'flex gap-2'}`}>
                {/* Country Dropdown */}
                <select
                  name="phone_country"
                  value={formData.phone_country_code}
                  onChange={handleInputChange}
                  className={`${isMobile ? 'w-full' : 'flex-1'} ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-green-500`}
                  required
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.dial_code})
                    </option>
                  ))}
                </select>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="PHONE"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${isMobile ? 'w-full' : 'flex-1'} ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500`}
                  required
                />
              </div>
            </div>

            {/* WhatsApp Checkbox */}
            <div className="flex items-start space-x-3 mt-1">
              <input
                type="checkbox"
                name="is_whatsapp_number"
                checked={formData.is_whatsapp_number}
                onChange={handleInputChange}
                className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-green-600 border-gray-300 rounded focus:ring-green-500`}
              />
              <label
                htmlFor="is_whatsapp_number"
                className={`text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'}`}
              >
                Is this your WhatsApp number?
              </label>
            </div>

            {/* Message/Notes Section */}
            <div>
              <textarea
                name="message"
                placeholder="MESSAGE"
                value={formData.message}
                onChange={handleInputChange}
                rows={isMobile ? 4 : 6}
                className={`w-full ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-500 resize-none`}
                required
              />
            </div>

            {/* Status Messages */}
            {successMessage && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            {/* Captcha */}
            <div className={`${isMobile ? 'flex flex-col space-y-2 items-center' : 'flex items-center gap-4'}`}>
              <div className={`bg-gray-200 ${isMobile ? 'px-3 py-2' : 'px-4 py-2'} rounded border font-mono tracking-widest`}>
                <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>{captcha}</span>
              </div>
              <input
                type="text"
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className={`${isMobile ? 'px-3 py-2 text-sm w-32' : 'px-4 py-2 w-40'} border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-green-500`}
                required
              />
            </div>

            {/* Submit Button */}
            <div className={`${isMobile ? 'flex flex-col space-y-4 items-center' : 'flex items-center justify-end'}`}>
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img
                  src="/images/book-consulation/formBtn.png"
                  className={`${isMobile ? 'w-32' : 'w-44'}`}
                  alt={isLoading ? "Submitting..." : "submit"}
                />
              </button>
            </div>
          </form>
        </div>

        {/* Desktop: Marketing Message Second */}
        {!isMobile && (
          <div className="flex flex-col justify-center items-center text-center">
            <div className="mb-6">
              <h3 className="text-4xl font-bold text-green-600 italic mb-4">
                "Get in Touch"
              </h3>
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Contact <span className="italic">GREEN</span>
                <br />
                Today!
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed z-[9999999999999999999] inset-0 bg-black/20 flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className={`relative w-full ${isMobile ? 'max-w-sm' : 'max-w-6xl'} mx-4`}>
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="bg-[#eff5f1] p-4 border-lime-300 border relative shadow-2xl rounded-lg max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <div className="flex justify-end w-full mb-4">
                <button
                  onClick={handleClose}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-xl"
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">
                {renderContent()}
              </div>
            </div>
          ) : (
            /* Desktop Layout - Skewed Modal Background */
            <div
              className="bg-[#eff5f1] transform  border-lime-300 border py-10 px-16 relative shadow-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
              transform:"skewX(-16deg)"
               }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={handleClose}
                  style={{
                    transform:"skewX(12deg)"
                  }}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>
              {/* Modal Content */}
              <div
              style={{
                transform:"skewX(6deg)"
              }}
              className="transform  max-w-5xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;

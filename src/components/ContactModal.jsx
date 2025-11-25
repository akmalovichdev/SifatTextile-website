"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    comments: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки формы
    console.log("Form submitted:", formData);
    // Очистка формы после отправки
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      comments: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-gradient-to-br from-teal-50 to-white w-full max-w-[95%] sm:max-w-[90%] md:max-w-[500px] rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-teal-200 shadow-2xl animate-scaleIn mx-auto my-auto max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-600 hover:text-black text-2xl sm:text-3xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 z-10"
          aria-label={t("products.close")}
        >
          ×
        </button>

        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-2 sm:mb-3 pr-8">
          {t("services.getPrice")}
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-normal text-black mb-4 sm:mb-5">
          {t("services.contactSales")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
          {[t("services.formName"), t("services.formEmail"), t("services.formCompany"), t("services.formPhone")].map(
            (placeholder, i) => {
              const key = ["name", "email", "company", "phone"][i];
              return (
                <input
                  key={i}
                  type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className="text-sm sm:text-base md:text-lg font-normal text-[#0BBD83] placeholder:text-gray-400 w-full h-[44px] sm:h-[50px] py-2 px-4 sm:px-6 bg-white border border-[#0BBD83] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0BBD83] focus:border-transparent"
                />
              );
            }
          )}
          <textarea
            placeholder={t("services.formComment")}
            value={formData.comments}
            onChange={(e) =>
              setFormData({ ...formData, comments: e.target.value })
            }
            className="text-sm sm:text-base md:text-lg font-normal text-[#0BBD83] placeholder:text-gray-400 w-full h-[80px] sm:h-[100px] py-2 px-4 sm:px-6 bg-white border border-[#0BBD83] rounded-[10px] resize-none focus:outline-none focus:ring-2 focus:ring-[#0BBD83] focus:border-transparent"
          ></textarea>

          <button
            type="submit"
            className="text-center w-full h-[44px] sm:h-[50px] bg-[#0BBD83] hover:bg-[#0aa775] text-white rounded-[10px] text-sm sm:text-base md:text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {t("services.formSubmit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;


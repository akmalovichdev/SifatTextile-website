"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Certificates = ({ setActiveSection }) => {
  const { t } = useLanguage();

  // Здесь можно добавить массив сертификатов, когда они будут доступны
  const certificates = [];

  return (
    <div className="bg-white min-h-screen pt-[120px] sm:pt-[140px]">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] py-10 sm:py-12 md:py-16">
        {/* Кнопка "Назад" */}
        <button
          onClick={() => {
            if (setActiveSection) {
              setActiveSection("MainPage");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 text-[#0BBD83] hover:text-[#0aa775] transition-colors duration-300 mb-6 sm:mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-base sm:text-lg font-medium">{t("certificates.back")}</span>
        </button>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#005E77] mb-8 sm:mb-10 md:mb-12 text-center">
          {t("certificates.title")}
        </h1>

        <div className="max-w-6xl mx-auto">
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 sm:p-6 border-2 border-[#0BBD83] hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold text-[#005E77]">
                    {cert.name}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 sm:p-10 md:p-12 text-center border-2 border-[#0BBD83]">
              <p className="text-base sm:text-lg md:text-xl text-gray-700">
                {t("certificates.noCertificates")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;


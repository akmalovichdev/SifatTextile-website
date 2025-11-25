"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ContactModal from "@/components/ContactModal";

const Career = ({ setActiveSection }) => {
  const { t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
          <span className="text-base sm:text-lg font-medium">{t("career.back")}</span>
        </button>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#005E77] mb-8 sm:mb-10 md:mb-12 text-center">
          {t("career.title")}
        </h1>

        <div className="max-w-4xl mx-auto">
          {/* Публикация вакансий */}
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8 md:p-10 mb-8 sm:mb-10 border-2 border-[#0BBD83]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0BBD83] mb-4 sm:mb-6">
              {t("career.vacancies")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">
              {t("career.vacanciesDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/vacancies"
                className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 inline-block text-center"
              >
                {t("career.viewVacancies")}
              </a>
              <a
                href="https://puremilky.hurma.work/public-vacancies/536?source=MTAwMw==&utm_source=sifattextile_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#005E77] hover:bg-[#004a5f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 inline-block text-center"
              >
                {t("career.sendApplication") || "Отправить заявку"}
              </a>
            </div>
          </div>

          {/* Обратная связь */}
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8 md:p-10 border-2 border-[#0BBD83]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0BBD83] mb-4 sm:mb-6">
              {t("career.feedback")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">
              {t("career.feedbackDescription")}
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-all duration-300"
            >
              {t("career.sendFeedback")}
            </button>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default Career;


"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ContactModal from "@/components/ContactModal";

const Maroqand = ({ setActiveSection }) => {
  const { t } = useLanguage();
  const [maroqand, setmaroqand] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Имитируем запрос к базе данных через API
    fetch("/data/Data.json")
      .then((res) => res.json())
      .then((data) => setmaroqand(data.maroqand))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  return (
    <div className="bg-white">
      {/* Кнопка "Назад" */}
      <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] pt-[120px] sm:pt-[140px]">
        <button
          onClick={() => {
            if (setActiveSection) {
              setActiveSection("MainPage");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 text-[#0BBD83] hover:text-[#0aa775] transition-colors duration-300 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-base sm:text-lg font-medium">{t("maroqand.back")}</span>
        </button>
      </div>
      <section className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] mb-[80px] sm:mb-[100px] mt-[20px] sm:mt-[40px]">
        <div
          className="
        flex flex-col
        2xl:flex-row
        items-center [@media(min-width:1651px)]:items-start
        justify-center gap-10 xl:gap-[81px]
      "
        >
          {/* --- Текстовый блок --- */}
          <div className="max-w-[832px] text-black font-normal leading-relaxed text-center 2xl:text-left">
            <div>
              <h1 className="font-bold text-[28px] sm:text-[38px] md:text-[46px] lg:text-[55px] text-[#005E77] mb-6 sm:mb-[35px] break-words">
                Maroqand Sifat Tekstil
              </h1>
            </div>

            <div className="font-normal text-sm sm:text-base md:text-lg lg:text-xl flex flex-col gap-5 text-black">
              <p className="text-justify">
                {t("maroqand.description1")}
              </p>

              <p className="text-justify">
                {t("maroqand.description2")}
              </p>

              <p className="text-justify">
                {t("maroqand.description3")}
              </p>
            </div>

            <div className="flex justify-center [@media(min-width:1651px)]:justify-start">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-[#0BBD83] hover:bg-teal-700 text-white
            px-5 py-3 sm:px-6 sm:py-4 rounded-[10px]
            text-sm sm:text-lg md:text-xl font-medium mt-[40px] sm:mt-[55px]
            whitespace-nowrap transition-all duration-300 cursor-pointer"
              >
                {t("contact.btn")}
              </button>
            </div>
          </div>

          {/* --- Видео ролики --- */}
          <div className="w-full max-w-[700px] sm:max-w-[747px] flex-shrink-0">
            <div
              className="
          relative
          w-full
          h-[250px] sm:h-[320px] md:h-[400px] lg:h-[465px]
          rounded-lg overflow-hidden shadow-lg
          transition-all duration-500 ease-in-out
        "
            >
              {maroqand && maroqand.videos && maroqand.videos.length > 0 ? (
                <img
                  src={maroqand.videos[currentVideoIndex]}
                  alt={`Factory Video ${currentVideoIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 animate-pulse" />
              )}
            </div>
            {/* Навигация по роликам */}
            {maroqand && maroqand.videos && maroqand.videos.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {maroqand.videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentVideoIndex === index
                        ? "bg-[#0BBD83] w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Показать видео ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>

  )
}

export default Maroqand

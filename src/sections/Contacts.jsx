"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FaPhone, FaUser } from "react-icons/fa";

const Contacts = ({ setActiveSection }) => {
  const { t } = useLanguage();

  const salesManagers = [
    {
      name: "Облокулов Ойбек",
      position: t("contacts.salesManager"),
      phone: "+998 90 657 05 02",
      phoneLink: "+998906570502"
    },
    {
      name: "Мурадимов Отабек",
      position: t("contacts.salesManager"),
      phone: "+998 97 390 38 00",
      phoneLink: "+998973903800"
    },
    {
      name: "Ходжиев Мирзобек",
      position: t("contacts.salesManager"),
      phone: "+998 93 356 28 44",
      phoneLink: "+998933562844"
    }
  ];

  const procurementDepartment = [
    {
      name: "Шохрух Шерматов",
      position: t("contacts.procurementDepartment"),
      phone: "+998915555088",
      phoneLink: "+998915555088"
    }
  ];

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
          <span className="text-base sm:text-lg font-medium">{t("contacts.back")}</span>
        </button>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#005E77] mb-8 sm:mb-10 md:mb-12 text-center">
          {t("contacts.title")}
        </h1>

        {/* Менеджеры по продажам */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0BBD83] mb-6 sm:mb-8 text-center">
            {t("contacts.salesManagers")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {salesManagers.map((manager, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 sm:p-8 border-2 border-[#0BBD83] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0BBD83] rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#005E77]">
                      {manager.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {manager.position}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${manager.phoneLink}`}
                  className="flex items-center gap-3 text-[#0BBD83] hover:text-[#0aa775] transition-colors duration-300 mt-4"
                >
                  <FaPhone className="text-lg sm:text-xl" />
                  <span className="text-base sm:text-lg font-medium">{manager.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Отдел закупок */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0BBD83] mb-6 sm:mb-8 text-center">
            {t("contacts.procurementTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {procurementDepartment.map((person, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 sm:p-8 border-2 border-[#0BBD83] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0BBD83] rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#005E77]">
                      {person.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {person.position}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${person.phoneLink}`}
                  className="flex items-center justify-center gap-3 text-[#0BBD83] hover:text-[#0aa775] transition-colors duration-300 mt-4"
                >
                  <FaPhone className="text-lg sm:text-xl" />
                  <span className="text-base sm:text-lg font-medium">{person.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;


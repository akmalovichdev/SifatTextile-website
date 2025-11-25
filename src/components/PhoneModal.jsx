"use client";
import React from "react";
import { FaPhone } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const PhoneModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const managers = [
    {
      name: "Облокулов Ойбек",
      phone: "+998 90 657 05 02",
      phoneLink: "+998906570502"
    },
    {
      name: "Мурадимов Отабек",
      phone: "+998 97 390 38 00",
      phoneLink: "+998973903800"
    },
    {
      name: "Ходжиев Мирзобек",
      phone: "+998 93 356 28 44",
      phoneLink: "+998933562844"
    }
  ];

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
      <div className="relative bg-white w-full max-w-[95%] sm:max-w-[90%] md:max-w-[500px] rounded-2xl p-4 sm:p-6 border-2 border-[#0BBD83] shadow-2xl animate-scaleIn mx-auto my-auto max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-600 hover:text-black text-2xl sm:text-3xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 z-10"
          aria-label="Закрыть"
        >
          ×
        </button>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#005E77] mb-4 sm:mb-6 pr-8">
          {t("phoneModal.title")}
        </h3>

        <div className="space-y-3 sm:space-y-4">
          {managers.map((manager, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-[#0BBD83] hover:bg-gray-100 transition-colors"
            >
              <p className="text-base sm:text-lg font-medium text-[#005E77] mb-2">
                {manager.name}
              </p>
              <a
                href={`tel:${manager.phoneLink}`}
                className="flex items-center gap-3 text-[#0BBD83] hover:text-[#0aa775] transition-colors"
              >
                <FaPhone className="text-lg" />
                <span className="text-base sm:text-lg font-medium">{manager.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;


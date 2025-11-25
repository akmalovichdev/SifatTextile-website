"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

const VacanciesPage = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVacancies();
  }, []);

  const loadVacancies = async () => {
    try {
      const response = await fetch("/api/vacancies");
      const data = await response.json();
      setVacancies(data.filter(v => v.active !== false));
    } catch (error) {
      console.error("Ошибка загрузки вакансий:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] sm:pt-[140px]">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] py-10 sm:py-12 md:py-16">
        {/* Кнопка "Назад" */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[#0BBD83] hover:text-[#0aa775] transition-colors duration-300 mb-6 sm:mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-base sm:text-lg font-medium">{t("career.back")}</span>
        </button>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#005E77] mb-8 sm:mb-10 md:mb-12 text-center">
          {t("vacancies.title")}
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Загрузка вакансий...</p>
          </div>
        ) : vacancies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t("vacancies.noVacancies")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-gray-50 rounded-lg p-6 sm:p-8 border-2 border-[#0BBD83] hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-[#005E77] mb-4">
                  {vacancy.title}
                </h2>
                <p className="text-gray-700 mb-6 flex-grow text-sm sm:text-base">
                  {vacancy.description}
                </p>
                {vacancy.link && (
                  <a
                    href={vacancy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-6 py-3 rounded-lg text-center font-medium transition-all duration-300 inline-block"
                  >
                    {t("vacancies.viewDetails")}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VacanciesPage;


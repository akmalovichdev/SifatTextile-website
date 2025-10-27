"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const Maroqand = () => {
  const { t } = useLanguage();
  const [maroqand, setmaroqand] = useState([]);

  useEffect(() => {
    // Имитируем запрос к базе данных через API
    fetch("/data/Data.json")
      .then((res) => res.json())
      .then((data) => setmaroqand(data.maroqand))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  return (
    <div className="bg-white">
      <section className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] mb-[80px] sm:mb-[100px] mt-[120px] sm:mt-[180px] lg:mt-[247px]">
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
                Завод Maroqand Sifat Tekstil был основан в 2018 году и расположен в Самаркандской области Узбекистана. Основное направление деятельности предприятия — глубокая переработка хлопка и производство высококачественной хлопчатобумажной пряжи. Годовой объём выпуска превышает 10 000 тонн пряжи.
              </p>

              <p className="text-justify">
                Основная продукция: <br />
                пряжа в диапазоне от Ne 6/1 до Ne 20/1.<br />
                Специальные виды пряжи, включая:<br />
                • Slub yarn — от Ne 6/1 до Ne 20/1.<br />
                • Lycra и Dual Core — от Ne 6/1 до Ne 20/1.<br />
              </p>

              <p className="text-justify">
                На предприятии занято более 500 сотрудников, среди которых — опытные специалисты из Узбекистана, а также приглашённые иностранные эксперты из Турции и Индии, обеспечивающие внедрение международных стандартов качества.
              </p>
            </div>

            <div className="flex justify-center [@media(min-width:1651px)]:justify-start">
              <button
                className="bg-[#0BBD83] hover:bg-teal-700 text-white
            px-5 py-3 sm:px-6 sm:py-4 rounded-[10px]
            text-sm sm:text-lg md:text-xl font-medium mt-[40px] sm:mt-[55px]
            whitespace-nowrap transition-all duration-300"
              >
                {t("contact.btn")}
              </button>
            </div>
          </div>

          {/* --- Изображение --- */}
          <div
            className="
          relative
          w-full
          max-w-[700px]
          sm:max-w-[747px]
          h-[250px] sm:h-[320px] md:h-[400px] lg:h-[465px]
          rounded-lg overflow-hidden shadow-lg
          transition-all duration-500 ease-in-out
          flex-shrink-0
        "
          >
            {maroqand ? (
              <img
                src={maroqand.video}
                alt="Factory Video"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            ) : (
              // Плейсхолдер (например, серая заливка или скелет)
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            )}
            <button className="absolute inset-0 flex items-center justify-center group">
              <div
                className="w-10 sm:w-14 md:w-16 h-10 sm:h-14 md:h-16 rounded-full bg-white/90
            flex items-center justify-center
            group-hover:bg-white transition-colors duration-300"
              >
                <div
                  className="w-0 h-0 border-t-[6px] sm:border-t-[9px] md:border-t-[10px] border-t-transparent
              border-l-[10px] sm:border-l-[16px] md:border-l-[18px] border-l-teal-900
              border-b-[6px] sm:border-b-[9px] md:border-b-[10px] border-b-transparent ml-1"
                ></div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Maroqand

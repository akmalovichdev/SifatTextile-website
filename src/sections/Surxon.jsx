"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const Surxon = () => {
    const { t } = useLanguage();
    const [surxon, setsurxon] = useState([]);

    useEffect(() => {
        // Имитируем запрос к базе данных через API
        fetch("/Data/Data.json")
            .then((res) => res.json())
            .then((data) => setsurxon(data.surxon))
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
                    <div className=" max-w-[832px] text-black font-normal leading-relaxed text-center 2xl:text-left">
                        <div>
                            <h1 className="font-bold text-[28px] sm:text-[38px] md:text-[46px] lg:text-[55px] text-[#005E77] mb-6 sm:mb-[35px] break-words">
                                Siyob Group Tekstil
                            </h1>
                        </div>

                        <div className="font-normal text-sm sm:text-base md:text-lg lg:text-xl flex flex-col gap-5 text-black">
                            <p className="text-justify">
                                Завод <strong>SURXON SIFAT TEKSTIL</strong> был основан в 2018 году и расположен в
                                Сурхандарьинской области Узбекистана. Предприятие специализируется на глубокой
                                переработке хлопка и выпуске высококачественной хлопковой пряжи. Производственные
                                мощности включают 30 144 шпинделя, обеспечивающих полный цикл прядильного процесса.
                                Годовой объём выпуска пряжи достигает 12 000 тонн.
                            </p>

                            <p className="text-justify">
                                На заводе работают более 600 специалистов, среди которых значительная часть — молодые
                                квалифицированные кадры, вносящие энергию и инновации в развитие производства.
                            </p>

                            <p className="text-justify">
                                Основная продукция предприятия — это гребенная и кардная пряжа кольцевого прядения в
                                диапазоне от Ne 6/1 до Ne 40/1. Кроме того, завод выпускает специальные виды пряжи,
                                в том числе <strong>Slub-пряжу</strong> — в диапазоне от Ne 6/1 до Ne 30/1.
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
                        {surxon ? (
                            <img
                                src={surxon.video}
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

export default Surxon

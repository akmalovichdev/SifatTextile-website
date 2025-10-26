"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const WhyUs = () => {
    const { t } = useLanguage();
    const [whyUs, setwhyUs] = useState(null);

    useEffect(() => {
        // Имитируем запрос к базе данных через API
        fetch("/Data/Data.json")
            .then((res) => res.json())
            .then((data) => setwhyUs(data.whyUs))
            .catch((err) => console.error("Ошибка загрузки:", err));
    }, []);


    return (
        <div>
            <section id="WhyUs" className="py-16 md:py-24 bg-[#005E77] text-white">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
                    <h2 className="text-3xl md:text-4xl font-bold mb-[60px] text-center md:text-left">
                        {t("whyUs.title")}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Левая часть */}
                        <div className="space-y-[50px]">
                            <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl font-normal whitespace-pre-line">
                                {t("whyUs.mainText")}
                            </p>

                            <div className="relative rounded-lg overflow-hidden aspect-video w-full max-w-[793px] mx-auto md:mx-0">
                                {whyUs ? (
                                    <img
                                        src={whyUs.video}
                                        alt="Factory Video"
                                        className="w-full h-full object-cover transition-opacity duration-500"
                                    />
                                ) : (
                                    // Плейсхолдер (например, серая заливка или скелет)
                                    <div className="w-full h-full bg-gray-300 animate-pulse" />
                                )}
                                <button className="absolute inset-0 flex items-center justify-center group">
                                    <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
                                        <div className="w-0 h-0 border-t-[10px] sm:border-t-[12px] border-t-transparent border-l-[18px] sm:border-l-[20px] border-l-teal-900 border-b-[10px] sm:border-b-[12px] border-b-transparent ml-1"></div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Правая часть */}
                        <div className="space-y-10 md:space-y-12">
                            {[
                                {
                                    img: "/Icons/vector.png",
                                    text: t("whyUs.quality"),
                                },
                                {
                                    img: "/Icons/vector-1.png",
                                    text: t("whyUs.reliability"),
                                },
                                {
                                    img: "/Icons/vector-4.png",
                                    text: t("whyUs.openness"),
                                },
                                {
                                    img: "/Icons/vector-2.png",
                                    text: t("whyUs.delivery"),
                                },
                                {
                                    img: "/Icons/vector-3.png",
                                    text: t("whyUs.international"),
                                },
                            ].map(({ img, text }, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg">
                                        <img src={img} alt="" className="max-w-[44px] max-h-[44px]" />
                                    </div>
                                    <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl font-normal">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default WhyUs

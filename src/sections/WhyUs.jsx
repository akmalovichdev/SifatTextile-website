"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const WhyUs = () => {
    const { t } = useLanguage();
    const [whyUs, setwhyUs] = useState(null);

    useEffect(() => {
        // Имитируем запрос к базе данных через API
        fetch("/data/Data.json")
            .then((res) => res.json())
            .then((data) => setwhyUs(data.whyUs))
            .catch((err) => console.error("Ошибка загрузки:", err));
    }, []);


    return (
        <div>
            <section id="WhyUs" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-[#005E77] text-white">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
                    <h2 className="text-3xl sm:text-[36px] md:text-4xl lg:text-[42px] font-bold mb-10 sm:mb-12 md:mb-14 lg:mb-[60px] text-center md:text-left">
                        {t("whyUs.title")}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
                        {/* Левая часть */}
                        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-[50px]">
                            <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl lg:text-xl font-normal whitespace-pre-line">
                                {t("whyUs.mainText").split(/(Sifat Textile)/gi).map((part, index) =>
                                    part.toLowerCase() === 'sifat textile' ? (
                                        <React.Fragment key={index}>
                                            <span className="font-semibold text-[#0BBD83]">Sifat Textile</span>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment key={index}>{part}</React.Fragment>
                                    )
                                )}
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
                            </div>
                        </div>

                        {/* Правая часть */}
                        <div className="space-y-8 sm:space-y-10 md:space-y-12">
                            {[
                                {
                                    img: "/Icons/Vector.png",
                                    text: t("whyUs.quality"),
                                },
                                {
                                    img: "/Icons/Vector-1.png",
                                    text: t("whyUs.reliability"),
                                },
                                {
                                    img: "/Icons/Vector-4.png",
                                    text: t("whyUs.openness"),
                                },
                                {
                                    img: "/Icons/Vector-2.png",
                                    text: t("whyUs.delivery"),
                                },
                                {
                                    img: "/Icons/Vector-3.png",
                                    text: t("whyUs.international"),
                                },
                            ].map(({ img, text }, i) => (
                                <div key={i} className="flex gap-3 sm:gap-4 items-start">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg">
                                        <img src={img} alt="" className="max-w-[40px] max-h-[40px] sm:max-w-[44px] sm:max-h-[44px]" />
                                    </div>
                                    <p className="text-white/90 leading-relaxed text-base sm:text-lg md:text-xl lg:text-xl font-normal">
                                        {text.split(/(Sifat Textile)/gi).map((part, index) =>
                                            part.toLowerCase() === 'sifat textile' ? (
                                                <span key={index} className="font-semibold text-[#0BBD83]">Sifat Textile</span>
                                            ) : (
                                                part
                                            )
                                        )}
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

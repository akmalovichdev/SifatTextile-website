"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    
    return (
        <div>
            <section className="relative overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-16 xl:pt-20 md:pt-14 md:pb-24">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] relative">
                    <div className="grid gap-10 items-center min-h-[500px] lg:min-h-[650px] xl:min-h-[800px]">

                        {/* Текстовая часть */}
                        <div className="space-y-8 z-10">
                            <div className="space-y-4">
                                <h1 className="font-bold text-[#005E77] leading-tight text-[clamp(32px,5vw,65px)] 2xl:text-7xl whitespace-pre-line">
                                    {t("hero.title")}
                                </h1>

                                <p className="text-[clamp(16px,1.3vw,20px)] 2xl:text-2xl font-medium text-black max-w-[500px]">
                                    {t("hero.subtitle")}
                                </p>
                            </div>

                            {/* Кнопки */}
                            <div className="flex gap-4">
                                <button className="relative overflow-hidden bg-[#0BBD83] text-white text-xs sm:text-sm w-[160px] sm:w-[160px] md:w-[180px] h-[48px] sm:h-[52px] md:h-[54px] px-4 py-[10px]  font-semibold rounded-[10px] hover:bg-[#0aa775] transition-all duration-300">
                                    <span className="relative z-10">{t("hero.btnOrder")}</span>
                                </button>

                                <button className="relative overflow-hidden bg-white text-[#0BBD83] text-xs sm:text-sm w-[150px] sm:w-[150px] md:w-[170px] h-[48px] sm:h-[52px] md:h-[54px] px-4 py-[10px]  font-semibold rounded-[10px] border border-[#0BBD83] hover:bg-[#f3fef9] transition-all duration-300">
                                    <span className="relative z-10">{t("hero.btnProducts")}</span>
                                </button>
                            </div>
                        </div>

                        {/* Изображение */}
                        <div className="absolute right-[-120px] top-[-40px] sm:right-[-100px] md:right-[-100px] md:top-[-100px] lg:right-[-90px]  z-0 pointer-events-none">
                            <img
                                src="/Background/Background_1.png"
                                alt="Фоновое изображение"
                                className="w-[600px] sm:w-[650px] md:w-[700px] lg:w-[850px] xl:w-[1000px] 2xl:w-[1200px] max-w-none select-none"
                            />
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Hero

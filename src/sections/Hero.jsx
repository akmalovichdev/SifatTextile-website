"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    const [backgroundImage, setBackgroundImage] = useState("/Background/Background_1.png");
    const [backgroundVideo, setBackgroundVideo] = useState(null);

    useEffect(() => {
        fetch("/data/Data.json")
            .then((res) => res.json())
            .then((data) => {
                if (data.hero) {
                    if (data.hero.background) {
                        setBackgroundImage(data.hero.background);
                    }
                    if (data.hero.video) {
                        setBackgroundVideo(data.hero.video);
                    }
                }
            })
            .catch((err) => console.error("Ошибка загрузки:", err));
    }, []);

    const isVideo = (path) => {
        if (!path) return false;
        const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
        return videoExtensions.some(ext => path.toLowerCase().endsWith(ext));
    };

    return (
        <div>
            <section id="hero" className="relative overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24 xl:pt-20 xl:pb-24" style={{ zIndex: 1 }}>
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] relative">
                    <div className="grid gap-8 sm:gap-10 md:gap-12 items-center min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[800px]">

                        {/* Текстовая часть */}
                        <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 relative z-10 max-w-[90%] xs:max-w-[400px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[600px] xl:max-w-[580px] 2xl:max-w-[650px]">
                            <div className="space-y-3 sm:space-y-4 md:space-y-5">
                                <h1 className="font-bold text-[#005E77] leading-[1.2] sm:leading-tight text-[28px] xs:text-[32px] sm:text-[40px] md:text-[44px] lg:text-[50px] xl:text-[65px] 2xl:text-7xl whitespace-pre-line drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                                    {t("hero.title")}
                                </h1>

                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-medium text-black max-w-[500px] md:max-w-[550px] drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
                                    {t("hero.subtitle")}
                                </p>
                            </div>

                            {/* Кнопки */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 z-10 relative">
                                <button
                                    onClick={() => {
                                        const contactSection = document.getElementById("ContactUs");
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="bg-[#0BBD83] text-white text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto sm:min-w-[160px] md:min-w-[200px] lg:min-w-[220px] h-[48px] sm:h-[52px] md:h-[56px] lg:h-[60px] px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-[10px] hover:bg-[#0aa775] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center"
                                >
                                    {t("hero.btnOrder")}
                                </button>

                                <button
                                    onClick={() => {
                                        const productsSection = document.getElementById("OurProduct");
                                        if (productsSection) {
                                            productsSection.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="bg-white text-[#0BBD83] text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto sm:min-w-[150px] md:min-w-[190px] lg:min-w-[210px] h-[48px] sm:h-[52px] md:h-[56px] lg:h-[60px] px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-[10px] border-2 border-[#0BBD83] hover:bg-[#f3fef9] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    {t("hero.btnProducts")}
                                </button>
                            </div>
                        </div>

                        {/* Изображение или Видео */}
                        <div className="absolute right-[-250px] top-[50px] xs:right-[-200px] xs:top-[20px] sm:right-[-150px] sm:top-[-40px] md:right-[-100px] md:top-[-80px] lg:right-[-120px] lg:top-[-90px] xl:right-[-100px] xl:top-[-100px] 2xl:right-[-80px] 2xl:top-[-100px] pointer-events-none opacity-30 xs:opacity-40 sm:opacity-100" style={{ zIndex: 0 }}>
                            {backgroundVideo && isVideo(backgroundVideo) ? (
                                <video
                                    src={backgroundVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-[400px] xs:w-[450px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[900px] 2xl:w-[1100px] max-w-none select-none"
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                />
                            ) : (
                                <img
                                    src={backgroundImage}
                                    alt="Фоновое изображение"
                                    className="w-[400px] xs:w-[450px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[900px] 2xl:w-[1100px] max-w-none select-none"
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                    loading="eager"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Hero

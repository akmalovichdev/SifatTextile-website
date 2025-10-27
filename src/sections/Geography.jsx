"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import InteractiveLeafletMap from '@/components/MapWrapper';

const Geography = () => {
    const { t } = useLanguage();

    return (
        <div>
            <section id='Geography' className="bg-white py-16 sm:py-20 md:py-28 lg:py-36">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12">
                    <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 items-center text-center">
                        {/* Интерактивная карта Google Maps */}
                        <div className="w-full max-w-[1660px]">
                            <InteractiveLeafletMap />
                        </div>

                        {/* Текст */}
                        <div className="w-full max-w-[1660px]">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-black leading-relaxed sm:leading-loose text-center sm:text-justify">
                                <span className="font-semibold">Siyob Group Textile</span> {t("geography.text")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Geography

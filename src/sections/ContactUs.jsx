"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ContactUs = () => {
    const { t } = useLanguage();
    
    return (
        <div>
            <section className="bg-[#0BBD83] py-16 px-4">
                <div className="max-w-[1920px] mx-auto px-6">
                    <div className="flex flex-col justify-center items-center text-center gap-6 h-auto min-h-[300px] md:h-[433px]">
                        {/* Текст */}
                        <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-snug px-4">
                            {t("contact.text")}
                        </p>

                        {/* Кнопка */}
                        <button
                            className="w-full max-w-[220px] sm:w-[180px] md:w-[165px] h-[50px] sm:h-[54px]
                   border border-white text-white text-lg sm:text-[16px] font-medium rounded-[10px]
                   bg-transparent hover:bg-white hover:text-[#0BBD83]
                   transition-all duration-500 ease-in-out active:scale-[0.98]"
                        >
                            {t("contact.btn")}
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ContactUs

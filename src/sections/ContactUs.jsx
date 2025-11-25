"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ContactModal from '@/components/ContactModal';

const ContactUs = ({ setActiveSection }) => {
    const { t } = useLanguage();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <div>
            <section id="ContactUs" className="bg-[#0BBD83] py-14 sm:py-16 md:py-20 lg:py-24 px-4">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-6 md:px-7 lg:px-[50px] 2xl:px-[100px]">
                    <div className="flex flex-col justify-center items-center text-center gap-5 sm:gap-6 md:gap-8 h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:h-[433px]">
                        {/* Текст */}
                        <p className="text-2xl sm:text-3xl md:text-[36px] lg:text-4xl font-medium text-white leading-snug px-4 md:px-6">
                            {t("contact.text")}
                        </p>

                        {/* Кнопка */}
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="w-full max-w-[220px] sm:max-w-[240px] md:w-[200px] lg:w-[220px] h-[50px] sm:h-[54px] md:h-[58px] lg:h-[62px]
                   border-2 border-white text-white text-lg sm:text-xl md:text-xl lg:text-2xl font-medium rounded-[10px]
                   bg-transparent hover:bg-white hover:text-[#0BBD83]
                   transition-all duration-500 ease-in-out active:scale-[0.98] cursor-pointer"
                        >
                            {t("contact.btn")}
                        </button>
                    </div>
                </div>
            </section>

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
    )
}

export default ContactUs

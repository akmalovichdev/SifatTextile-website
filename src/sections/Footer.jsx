"use client";
import React from "react";
import {
    FaLocationDot,
    MdLocalPostOffice,
    FaPhone,
    FaTelegram,
    RiInstagramFill,
    FaYoutube,
    FaFacebook,
} from "@/index";
import { useLanguage } from "@/context/LanguageContext";

const Footer = ({ setActiveSection }) => {
    const { t } = useLanguage();

    return (
        <footer
            className="py-10"
            style={{
                background:
                    "linear-gradient(140deg, rgba(11,189,131,1) 0%, rgba(7,117,81,1) 75%, rgba(5,87,60,1) 100%)",
            }}
        >
            <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] flex flex-col md:flex-row xl:flex-row items-start justify-around gap-8 sm:gap-10 md:gap-8 lg:gap-10 text-white">
                {/* --- Контакты --- */}
                <div className="text-base sm:text-lg md:text-lg font-normal max-w-[582px]">
                    <p className="text-xl sm:text-2xl md:text-2xl font-semibold mb-4 sm:mb-5 hover:text-black transition-colors duration-300 cursor-pointer">
                        <span className="text-white">Sifat Textile</span>
                    </p>

                    <address className="not-italic">
                        {[
                            {
                                Icon: FaLocationDot,
                                text: "Тайлякский район, населённый пункт Кургонча",
                            },
                            {
                                Icon: MdLocalPostOffice,
                                text: "info@sifattextile.uz",
                            },
                            {
                                Icon: FaPhone,
                                text: "+99890 657 05 02",
                            },
                            {
                                Icon: FaPhone,
                                text: "+998 97 390 38 00",
                            },
                        ].map(({ Icon, text }, i) => (
                            <div
                                key={i}
                                className="flex items-center mb-3 hover:text-black transition-colors duration-300 cursor-pointer group"
                            >
                                <Icon className="w-[25px] h-[30px] mr-3.5 text-white transition-colors duration-300 group-hover:text-black" />
                                <p>{text}</p>
                            </div>
                        ))}
                    </address>

                    <div className="flex gap-3 mt-3">
                        {[
                            { Icon: FaYoutube, href: "https://www.youtube.com/@sifattextile" },
                            { Icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61583680194907&locale=ru_RU" },
                            { Icon: RiInstagramFill, href: "https://www.instagram.com/sifat_textile.uz/" },
                            { Icon: FaTelegram, href: "#" },
                        ].map(
                            ({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 hover:text-black transition-all duration-300"
                                >
                                    <Icon className="w-[30px] h-[30px] p-[2px]" />
                                </a>
                            )
                        )}
                    </div>
                </div>

                {/* --- Быстрые ссылки --- */}
                <div>
                    <p className="font-semibold text-base sm:text-lg md:text-lg mb-4 sm:mb-5 md:mb-[22px]">{t("footer.quickLinks")}</p>
                    <div className="flex flex-col gap-2 sm:gap-[6px] text-white">
                        {[
                            { name: t("footer.surxon"), key: "Surxon" },
                            { name: t("footer.maroqand"), key: "Maroqand" },
                            { name: t("footer.kamalak"), key: "Kamalak" },
                        ].map(({ name, key }, i) => (
                            <p
                                key={i}
                                onClick={() => key && setActiveSection(key)}
                                className={`transition-all duration-300 hover:text-black hover:translate-x-1 cursor-pointer text-base sm:text-lg md:text-lg font-normal ${key ? "cursor-pointer" : "cursor-default"
                                    }`}
                            >
                                {name}
                            </p>
                        ))}
                    </div>
                </div>

                {/* --- Карта --- */}
                <div className="w-full md:w-auto xl:w-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.281201763198!2d67.07318277658602!3d39.62087187157858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d20dc871fdd21%3A0x7d23dca989758dcc!2sPure%20Milky!5e0!3m2!1sru!2s!4v1762849887459!5m2!1sru!2s"
                        width="100%"
                        height="250"
                        style={{ border: 0, maxWidth: '476px', minHeight: '250px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl shadow-md w-full md:w-[400px] lg:w-[476px]"
                    ></iframe>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

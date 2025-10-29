"use client";
import React from "react";
import {
    FaLocationDot,
    MdLocalPostOffice,
    FaPhone,
    FaTelegram,
    RiInstagramFill,
    FaYoutube,
    FaGoogle,
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
            <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] flex flex-col xl:flex-row items-start justify-around gap-10 lg:gap-6 text-white">
                {/* --- Контакты --- */}
                <div className="text-lg font-normal max-w-[582px]">
                    <p className="text-2xl font-semibold mb-5 hover:text-black transition-colors duration-300 cursor-pointer">
                        Siyob Group Textile
                    </p>

                    <address className="not-italic">
                        {[
                            {
                                Icon: FaLocationDot,
                                text: "Комната 908, здание Kaijun, улица № 19 Juxiang 3rd, город Даланг, город Дунгуань, провинция Гуандун, Китай",
                            },
                            {
                                Icon: MdLocalPostOffice,
                                text: "siyobtextilegroup@gmail.com",
                            },
                            {
                                Icon: FaPhone,
                                text: "+998(99)322-9947",
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
                        {[FaTelegram, RiInstagramFill, FaYoutube, FaGoogle].map(
                            (Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
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
                    <p className="font-semibold text-lg mb-[22px]">{t("footer.quickLinks")}</p>
                    <div className="flex flex-col gap-[6px] text-white">
                        {[
                            { name: t("footer.surxon"), key: "Surxon" },
                            { name: t("footer.maroqand"), key: "Maroqand" },
                            { name: t("footer.kamalak"), key: "Kamalak" },
                            { name: t("footer.carded"), key: null },
                            { name: t("footer.combed"), key: null },
                            { name: t("footer.lycra"), key: null },
                            { name: t("footer.oe"), key: null },
                            { name: t("footer.slub"), key: null },
                        ].map(({ name, key }, i) => (
                            <p
                                key={i}
                                onClick={() => key && setActiveSection(key)}
                                className={`transition-all duration-300 hover:text-black hover:translate-x-1 cursor-pointer text-lg font-normal ${key ? "cursor-pointer" : "cursor-default"
                                    }`}
                            >
                                {name}
                            </p>
                        ))}
                    </div>
                </div>

                {/* --- Карта --- */}
                <div className="w-full xl:w-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d804.593600806212!2d66.9670519336559!3d39.64784250201714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1760276448787!5m2!1sru!2s"
                        width="100%"
                        height="280"
                        style={{ border: 0, maxWidth: '476px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl shadow-md w-full"
                    ></iframe>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

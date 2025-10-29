"use client";
import React, { useState } from "react";
import { FaPhone, FaBars, FaTimes } from "@index";
import { useLanguage } from "@/context/LanguageContext";

const Header = ({ setActiveSection }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const { t, language, changeLanguage } = useLanguage();

    const handleScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    const navItems = [
        { name: t("nav.about"), id: "AboutUs" },
        { name: t("nav.products"), id: "OurProduct" },
        { name: t("nav.services"), id: "OurServises" },
        { name: t("nav.whyUs"), id: "WhyUs" },
        { name: t("nav.geography"), id: "Geography" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[9998] bg-[#0BBD83] shadow-lg shadow-[#0BBD83]/50">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] py-2.5 sm:py-3 md:py-4 flex items-center justify-between gap-3">

                {/* Логотип */}
                <button
                    onClick={() => {
                        setActiveSection("MainPage");
                        setMenuOpen(false);
                    }}

                    className="flex items-center gap-2 flex-shrink-0">
                    <img
                        src="/Logo/Logo_white.png"
                        alt="Siyob Group Logo"
                        className="h-[50px] w-auto sm:h-[60px] md:h-[70px] lg:h-[80px] xl:h-[90px] object-contain drop-shadow-lg"
                    />
                </button>

                {/* Навигация (Desktop) */}
                <nav className="hidden lg:flex items-center gap-[10px] lg:gap-[20px] xl:gap-[30px]">
                    {navItems.map((item, i) =>
                        item.id === "OurServises" ? (
                            <button
                                key={i}
                                onClick={() => {
                                    setActiveSection("OurServises");
                                    handleScroll(item.id);
                                    setMenuOpen(false);
                                }}
                                className="text-xs lg:text-base xl:text-lg 2xl:text-xl 3xl font-medium text-white relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item.name}
                            </button>
                        ) : (
                            <button
                                key={i}
                                onClick={() => {
                                    setActiveSection("MainPage");
                                    handleScroll(item.id);
                                }}
                                className="text-xs lg:text-base xl:text-lg 2xl:text-xl font-medium text-white relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item.name}
                            </button>
                        )
                    )}

                    {/* Переключатель языка */}
                    <div className="relative">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="text-white text-xs lg:text-base xl:text-lg font-medium px-3 py-1 rounded hover:bg-white/10 transition-all"
                        >
                            {language.toUpperCase()}
                        </button>

                        {langMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
                                {['ru', 'en', 'uz'].filter(lang => lang !== language).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            changeLanguage(lang);
                                            setLangMenuOpen(false);
                                        }}
                                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                                    >
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <a href="">
                        <FaPhone className="w-[36px] sm:w-[42px] xl:w-[46px] h-[34px] sm:h-[38px] xl:h-[40px] py-[6px] px-[10px] border-2 rounded-[10px] text-white hover:bg-white hover:text-[#0BBD83] transition-all duration-300" />
                    </a>
                </nav>

                {/* Кнопка меню (Mobile) */}
                <button
                    className="lg:hidden text-white text-2xl sm:text-3xl p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Меню"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Мобильное меню */}
            <div
                className={`lg:hidden bg-[#0BBD83] text-white overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <nav className="flex flex-col items-center gap-6 py-6">
                    {navItems.map((item, i) =>
                        item.id === "OurServises" ? (
                            <button
                                key={i}
                                onClick={() => {
                                    setActiveSection("OurServises");
                                    setMenuOpen(false);
                                }}
                                className="text-base sm:text-lg md:text-XL font-medium hover:text-[#0BBD83] transition-colors"
                            >
                                {item.name}
                            </button>
                        ) : (
                            <button
                                key={i}
                                onClick={() => {
                                    setActiveSection("MainPage");
                                    handleScroll(item.id);
                                    setMenuOpen(false);
                                }}
                                className="text-base sm:text-lg md:text-XL font-medium hover:text-[#0BBD83] transition-colors"
                            >
                                {item.name}
                            </button>
                        )
                    )}

                    {/* Переключатель языка для мобильных */}
                    <div className="flex items-center gap-2">
                        {['ru', 'en', 'uz'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => {
                                    changeLanguage(lang);
                                }}
                                className={`px-3 py-1 rounded text-base ${
                                    lang === language
                                        ? 'bg-white text-[#0BBD83]'
                                        : 'bg-transparent border border-white'
                                }`}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <a
                        href=""
                        className="flex items-center gap-2 text-lg sm:text-xl border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-[var(--main-color)] transition-all duration-300"
                    >
                        <FaPhone /> {t("footer.call")}
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

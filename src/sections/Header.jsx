"use client";
import React, { useState } from "react";
import { FaPhone, FaBars, FaTimes } from "@index";

const Header = ({ setActiveSection }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    const navItems = [
        { name: "О нас", id: "AboutUs" },
        { name: "Наш продукт", id: "OurProduct" },
        { name: "Наши услуги", id: "OurServises" },
        { name: "Почему мы", id: "WhyUs" },
        { name: "География", id: "Geography" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0BBD83] shadow-sm shadow-[#0BBD83]">
            <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] py-3 sm:py-4 flex items-center justify-between">

                {/* Логотип */}
                <button
                    onClick={() => {
                        setActiveSection("MainPage");
                        setMenuOpen(false);
                    }}

                    className="flex items-center gap-2">
                    <img
                        src="/Logo/Logo_white.png"
                        alt="Siyob Group Logo"
                        className="max-w-[120px] sm:max-w-[150px] lg:max-w-[170px] xl:max-w-[184px] h-auto"
                    />
                </button>

                {/* Навигация (Desktop) */}
                <nav className="hidden lg:flex items-center gap-[10px] lg:gap-[20px] xl:gap-[30px]">
                    {navItems.map((item, i) =>
                        item.name === "Наши услуги" ? (
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

                    <a href="">
                        <FaPhone className="w-[36px] sm:w-[42px] xl:w-[46px] h-[34px] sm:h-[38px] xl:h-[40px] py-[6px] px-[10px] border-2 rounded-[10px] text-white hover:bg-white hover:text-[#0BBD83] transition-all duration-300" />
                    </a>
                </nav>

                {/* Кнопка меню (Mobile) */}
                <button
                    className="lg:hidden text-white text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
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
                        item.name === "Наши услуги" ? (
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

                    <a
                        href=""
                        className="flex items-center gap-2 text-lg sm:text-xl border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-[var(--main-color)] transition-all duration-300"
                    >
                        <FaPhone /> Позвонить
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

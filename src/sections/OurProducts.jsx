"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const OurProducts = () => {
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState([]);
    const { t } = useLanguage();

    useEffect(() => {
      // Имитируем запрос к базе данных через API
      fetch("/Data/Data.json")
        .then((res) => res.json())
        .then((data) => setProducts(data.products))
        .catch((err) => console.error("Ошибка загрузки:", err));
    }, []);

    // Проверяем ширину окна (нужно, чтобы при ресайзе всё было корректно)
    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 640);
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    // Если мобильное — показываем 2 карточки, иначе все
    const visibleProducts = isMobile && !showAll ? products.slice(0, 2) : products;

    return (
        <div>
            <section id="OurProduct" className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
                    {/* Заголовок и фильтры */}
                    <div className="text-center mb-12">
                        <h2 className="text-[34px] sm:text-[38px] md:text-[40px] font-medium text-black mb-8">
                            {t("products.title")}
                        </h2>

                        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto text-[#005E77]">
                            <input
                                type="text"
                                placeholder={t("products.search")}
                                className="border border-[#005E77] rounded-lg px-4 py-2 max-w-[278px] max-h-[54px] focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all duration-300"
                            />

                            <div className="flex flex-wrap gap-2 justify-center">
                                {["LW", "SL", "OE", "KW", "KCD", "KCM"].map((filter) => (
                                    <button
                                        key={filter}
                                        className="border border-[#005E77] rounded-lg px-[15px] py-[10px] text-sm font-medium text-[#005E77] bg-transparent hover:text-white hover:bg-[#005E77] transition-all duration-300"
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Сетка продуктов */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8 justify-items-center px-4 md:px-8">
                        {visibleProducts.map(({ id, img, title }) => (
                            <div
                                key={id}
                                className="bg-white rounded-lg border border-[#0BBD83] p-6 hover:shadow-lg hover:shadow-[#0BBD83]/40
                transition-all duration-300 w-full max-w-[380px] flex flex-col justify-between hover:border-[#0BBD83]"
                            >
                                {/* Изображение */}
                                <div className="flex items-center justify-center bg-gray-50 rounded-lg mb-4 h-[230px] sm:h-[200px] lg:h-[300px]">
                                    <img
                                        src={img}
                                        alt="Yarn Product"
                                        className="w-[220px] sm:w-[250px] lg:w-[280px] h-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Описание */}
                                <h3 className="text-xl sm:text-base font-medium text-[#005E77] mb-6 min-h-[60px] leading-snug text-center sm:text-left">
                                    {title}
                                </h3>

                                {/* Кнопки */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                                    <button
                                        className="w-full sm:w-[150px] h-[50px] sm:h-[40px] bg-[#0BBD83] text-white text-[15px] sm:text-xs font-semibold rounded-[10px]
                    hover:bg-[#0aa775] transition-all duration-300 active:scale-[0.98]"
                                    >
                                        {t("products.viewMore")}
                                    </button>

                                    <button
                                        className="w-full sm:w-[165px] h-[50px] sm:h-[40px] border border-[#0BBD83] text-[#0BBD83] text-[15px] sm:text-xs font-semibold rounded-[10px]
                    bg-transparent hover:bg-[#f3fef9] transition-all duration-300 active:scale-[0.98]"
                                    >
                                        {t("products.features")}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Кнопка Показать / Скрыть */}
                    {isMobile && (
                        <div className="text-center">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="w-[182px] h-[54px] bg-[#0BBD83] text-white text-xl font-semibold rounded-[10px]
                hover:bg-[#0aa775] transition-all duration-300 active:scale-[0.98]"
                            >
                                {showAll ? t("products.hideAll") : t("products.showAll")}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default OurProducts;

"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Статические данные для fallback
const staticProducts = [
    {
        id: 1,
        img: "/OurProducts/OurProducts_1.png",
        title: "Ne 6/1 – Ne 20/1 - Грубая, плотная и прочная пряжа."
    },
    {
        id: 2,
        img: "/OurProducts/OurProducts_2.png",
        title: "Ne 12/1 – Ne 16/1 - Средняя линейная плотность."
    },
    {
        id: 3,
        img: "/OurProducts/OurProducts_3.png",
        title: "Ne 18/1 – Ne 20/1 - Тонкая и ровная пряжа высокого качества."
    },
    {
        id: 4,
        img: "/OurProducts/OurProducts_4.png",
        title: "Ne 24/1 – Ne 30/1 - 100% полиэстер синельная пряжа"
    },
    {
        id: 5,
        img: "/OurProducts/OurProducts_5.png",
        title: "Ne 32/1 – Ne 36/1 - Средняя линейная плотность."
    },
    {
        id: 6,
        img: "/OurProducts/OurProducts_6.png",
        title: "Ne 40/1 - Пряжа исландия"
    },
    {
        id: 7,
        img: "/OurProducts/OurProducts_7.png",
        title: "Ne 6/1 – Ne 10/1 - Тонкая и ровная пряжа высокого качества."
    },
    {
        id: 8,
        img: "/OurProducts/OurProducts_8.png",
        title: "Ne 6/1 – Ne 30/1 - Грубая, плотная и прочная пряжа."
    }
];

// Данные о хлопковой пряже
const cottonYarnData = [
    { range: "Ne 6/1 – Ne 10/1", thickness: "veryThick", yarnType: "KCD (Carded) / OE", spinningType: "Ring / OE", application: "Джинсы (weft), махровые полотенца, спецткань, одеяла" },
    { range: "Ne 12/1 – Ne 16/1", thickness: "thick", yarnType: "KCD (Carded) / OE", spinningType: "Ring / OE", application: "Плотный трикотаж, униформа, рабочая одежда" },
    { range: "Ne 18/1 – Ne 20/1", thickness: "medium", yarnType: "KCD (Carded) / KCM (Combed)", spinningType: "Ring Spun / OE", application: "Футболки, свитшоты, плотный трикотаж" },
    { range: "Ne 24/1 – Ne 30/1", thickness: "mediumThin", yarnType: "KCD (Carded) / KCM (Combed — стандарт)", spinningType: "Ring / OE", application: "Трикотаж, постельное бельё, пижамы" },
    { range: "Ne 32/1 – Ne 36/1", thickness: "thin", yarnType: "KCD / KCM", spinningType: "Ring Spun / OE", application: "Сорочечные ткани, лёгкий трикотаж" },
    { range: "Ne 40/1", thickness: "veryThin", yarnType: "KCM (Combed Compact)", spinningType: "Ring Spun", application: "Premium трикотаж, рубашечные ткани, сатин, батист" }
];

// Данные о Slub пряже
const slubYarnData = [
    { range: "Ne 6/1 – Ne 10/1", thickness: "veryThick", yarnType: "Slub (Carded)", spinningType: "Ring Spun / OE", application: "Джинсовая ткань (уток), плотный casual трикотаж" },
    { range: "Ne 12/1 – Ne 16/1", thickness: "thick", yarnType: "Slub (Carded)", spinningType: "Ring Spun", application: "Denim, рабочие ткани, толстый трикотаж" },
    { range: "Ne 18/1 – Ne 24/1", thickness: "medium", yarnType: "Slub (Combed)", spinningType: "Ring / Compact", application: "Трикотаж, футболки, пижамы, текстиль для дома" },
    { range: "Ne 26/1 – Ne 30/1", thickness: "mediumThin", yarnType: "Slub (Combed / Compact)", spinningType: "Compact / Siro", application: "Премиум-трикотаж, декоративные ткани, fashion-текстиль" }
];

// Данные о Lycra & Dual Core пряже
const lycraYarnData = [
    { range: "Ne 6/1 – Ne 10/1", thickness: "thick", yarnType: "Core Spun (Cotton + Lycra)", spinningType: "Ring / Compact", application: "Stretch denim (уток), рабочая одежда" },
    { range: "Ne 12/1 – Ne 16/1", thickness: "medium", yarnType: "Core Spun / Dual Core", spinningType: "Ring / Compact", application: "Джинсовая ткань, эластичный трикотаж" },
    { range: "Ne 18/1 – Ne 20/1", thickness: "mediumThin", yarnType: "Dual Core (Cotton + Polyester + Lycra)", spinningType: "Compact", application: "Stretch poplin, сорочечные ткани, slim fit одежда" }
];

// Коды пряжи
const yarnCodes = [
    { code: "KCD", name: "KCD Ring Spun (Carded Ring Spun)", range: "6/1 – 30/1", example: "KCD 20/1" },
    { code: "KCM", name: "KCM Ring Spun (Combed Ring Spun)", range: "24/1 – 40/1", example: "KCM 30/1" },
    { code: "CPS", name: "Compact Spun (Combed Compact)", range: "30/1 – 40/1", example: "CPS 36/1" },
    { code: "SLB", name: "Slub Yarn (KCD Slub)", range: "6/1 – 30/1", example: "SLB 16/1" },
    { code: "LYC", name: "Lycra Core Spun", range: "6/1 – 20/1", example: "LYC 18/1" },
    { code: "DCR", name: "Dual Core Yarn (Polyester + Lycra)", range: "6/1 – 14/1", example: "DCR 16/1" }
];

const OurProducts = () => {
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState(staticProducts);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState("cotton");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
      if (typeof window === 'undefined') {
        setProducts(staticProducts);
        return;
      }

      fetch("/data/Data.json")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setProducts(data.products || staticProducts);
        })
        .catch((err) => {
          console.error("Ошибка загрузки:", err);
          setProducts(staticProducts);
        });
    }, []);

    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth < 640);
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    // Функция для извлечения диапазона Ne из названия продукта
    const extractNeRange = (title) => {
        const match = title.match(/Ne\s*(\d+\/\d+)(?:\s*–\s*Ne\s*(\d+\/\d+))?/i);
        if (match) {
            const start = parseFloat(match[1].split('/')[0]);
            const end = match[2] ? parseFloat(match[2].split('/')[0]) : start;
            return { start, end };
        }
        return null;
    };

    // Функция для определения типа пряжи из названия продукта
    const detectYarnType = (title) => {
        const titleLower = title.toLowerCase();

        // Проверяем на наличие ключевых слов
        if (titleLower.includes("slub") || titleLower.includes("слаб")) {
            return "SLB";
        }
        if (titleLower.includes("lycra") || titleLower.includes("лайкра") || titleLower.includes("эластичн")) {
            // Проверяем, не Dual Core ли это
            if (titleLower.includes("dual") || titleLower.includes("двойн") || titleLower.includes("polyester")) {
                return "DCR";
            }
            return "LYC";
        }
        if (titleLower.includes("dual") || titleLower.includes("двойн") || titleLower.includes("polyester")) {
            return "DCR";
        }
        if (titleLower.includes("compact") || titleLower.includes("компакт")) {
            return "CPS";
        }
        if (titleLower.includes("combed") || titleLower.includes("гребен")) {
            return "KCM";
        }
        // По умолчанию считаем кардной (KCD)
        return "KCD";
    };

    // Функция для проверки соответствия продукта фильтру
    const matchesFilterCode = (product, filterCode) => {
        if (!filterCode) return true;

        const neRange = extractNeRange(product.title);
        if (!neRange) return false;

        const filter = yarnCodes.find(yc => yc.code === filterCode);
        if (!filter) return false;

        // Определяем диапазоны для каждого типа пряжи
        const filterRanges = {
            "KCD": { start: 6, end: 30 }, // KCD Ring Spun: 6/1 – 30/1
            "KCM": { start: 24, end: 40 }, // KCM Ring Spun: 24/1 – 40/1
            "CPS": { start: 30, end: 40 }, // Compact Spun: 30/1 – 40/1
            "SLB": { start: 6, end: 30 }, // Slub Yarn: 6/1 – 30/1
            "LYC": { start: 6, end: 20 }, // Lycra Core Spun: 6/1 – 20/1
            "DCR": { start: 6, end: 14 }  // Dual Core Yarn: 6/1 – 14/1
        };

        const filterRange = filterRanges[filterCode];
        if (!filterRange) return false;

        // Проверяем тип пряжи
        const productType = detectYarnType(product.title);

        // Для LYC показываем только Lycra, исключая Dual Core
        if (filterCode === "LYC" && productType === "DCR") {
            return false;
        }

        // Для SLB показываем только Slub
        if (filterCode === "SLB" && productType !== "SLB") {
            return false;
        }

        // Для DCR показываем только Dual Core
        if (filterCode === "DCR" && productType !== "DCR") {
            return false;
        }

        // Проверяем пересечение диапазонов
        const rangeMatch = (neRange.start >= filterRange.start && neRange.start <= filterRange.end) ||
               (neRange.end >= filterRange.start && neRange.end <= filterRange.end) ||
               (neRange.start <= filterRange.start && neRange.end >= filterRange.end);

        // Для KCD, KCM, CPS проверяем только диапазон
        if (["KCD", "KCM", "CPS"].includes(filterCode)) {
            return rangeMatch && productType === filterCode;
        }

        return rangeMatch;
    };

    // Фильтрация продуктов
    const filteredProducts = products.filter(product => {
        const matchesSearch = searchQuery === "" ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            yarnCodes.some(yc =>
                product.title.includes(yc.code) ||
                searchQuery.toUpperCase().includes(yc.code)
            );

        const matchesFilter = matchesFilterCode(product, selectedFilter);

        return matchesSearch && matchesFilter;
    });

    const visibleProducts = isMobile && !showAll ? filteredProducts.slice(0, 2) : filteredProducts;

    const handleFilterClick = (filter) => {
        setSelectedFilter(selectedFilter === filter ? null : filter);
    };

    const getYarnData = () => {
        switch(selectedProductType) {
            case "slub": return slubYarnData;
            case "lycra": return lycraYarnData;
            default: return cottonYarnData;
        }
    };

    // Функция для получения переведенного application
    const getTranslatedApplication = (range, type) => {
        const neRange = extractNeRange(range);
        if (!neRange) return null;

        let key = "";
        if (type === "cotton") {
            if (neRange.start >= 6 && neRange.end <= 10) key = "6-10";
            else if (neRange.start >= 12 && neRange.end <= 16) key = "12-16";
            else if (neRange.start >= 18 && neRange.end <= 20) key = "18-20";
            else if (neRange.start >= 24 && neRange.end <= 30) key = "24-30";
            else if (neRange.start >= 32 && neRange.end <= 36) key = "32-36";
            else if (neRange.start === 40 && neRange.end === 40) key = "40";
        } else if (type === "slub") {
            if (neRange.start >= 6 && neRange.end <= 10) key = "6-10";
            else if (neRange.start >= 12 && neRange.end <= 16) key = "12-16";
            else if (neRange.start >= 18 && neRange.end <= 24) key = "18-24";
            else if (neRange.start >= 26 && neRange.end <= 30) key = "26-30";
        } else if (type === "lycra") {
            if (neRange.start >= 6 && neRange.end <= 10) key = "6-10";
            else if (neRange.start >= 12 && neRange.end <= 16) key = "12-16";
            else if (neRange.start >= 18 && neRange.end <= 20) key = "18-20";
        }

        if (key) {
            return t(`products.applications.${type}.${key}`);
        }
        return null;
    };

    // Функция для определения типа пряжи и поиска соответствующей записи
    const findProductData = (productTitle) => {
        const neRange = extractNeRange(productTitle);
        if (!neRange) return null;

        // Проверяем все типы пряжи
        const allData = [
            ...cottonYarnData.map(d => ({ ...d, type: "cotton" })),
            ...slubYarnData.map(d => ({ ...d, type: "slub" })),
            ...lycraYarnData.map(d => ({ ...d, type: "lycra" }))
        ];

        // Ищем точное совпадение диапазона
        for (const data of allData) {
            const dataRange = extractNeRange(data.range);
            if (dataRange &&
                ((neRange.start >= dataRange.start && neRange.start <= dataRange.end) ||
                 (neRange.end >= dataRange.start && neRange.end <= dataRange.end) ||
                 (neRange.start <= dataRange.start && neRange.end >= dataRange.end))) {
                // Получаем переведенное application
                const translatedApp = getTranslatedApplication(data.range, data.type);
                return { ...data, productTitle, application: translatedApp || data.application };
            }
        }

        // Если точного совпадения нет, возвращаем ближайшее
        return null;
    };

    // Модальное окно для описания продукта
    // Модальное окно для всех типов пряжи (когда нажата кнопка типа пряжи)
    const YarnTypeModal = () => {
        if (!showDetailsModal || selectedProduct) return null;
        if (selectedProductType === "codes") return null;

        const currentData = getYarnData();
        const thicknessMap = {
            veryThick: t("products.veryThick"),
            thick: t("products.thick"),
            medium: t("products.medium"),
            mediumThin: t("products.mediumThin"),
            thin: t("products.thin"),
            veryThin: t("products.veryThin")
        };

        return (
            <div
                className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowDetailsModal(false);
                    }
                }}
            >
                <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn mx-auto my-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center z-10 shadow-sm">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#005E77] pr-8 sm:pr-10 break-words">
                            {selectedProductType === "cotton" ? t("products.cottonYarnRange") :
                             selectedProductType === "slub" ? t("products.slubYarn") :
                             t("products.lycraYarn")}
                        </h3>
                        <button
                            onClick={() => setShowDetailsModal(false)}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                            aria-label={t("products.close")}
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6">
                        {/* Таблица */}
                        <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
                            <div className="inline-block min-w-full align-middle">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-[#0BBD83] text-white">
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.range")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.thickness")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.yarnType")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.spinningType")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold">{t("products.application")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((row, idx) => {
                                            const translatedApp = getTranslatedApplication(row.range, selectedProductType);
                                            return (
                                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{row.range}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{thicknessMap[row.thickness] || row.thickness}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm">{row.yarnType}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{row.spinningType}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm">{translatedApp || row.application}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ProductDescriptionModal = () => {
        if (!showDetailsModal || !selectedProduct) return null;

        const productData = findProductData(selectedProduct.title);
        if (!productData) {
            return (
                <div
                    className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowDetailsModal(false);
                        }
                    }}
                >
                    <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn mx-auto my-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center z-10 shadow-sm">
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#005E77] pr-8 sm:pr-10 break-words">
                                {selectedProduct.title}
                            </h3>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                                aria-label={t("products.close")}
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-3 sm:p-4 md:p-6">
                            <p className="text-center text-gray-500 text-sm sm:text-base">Информация о данном продукте пока недоступна.</p>
                        </div>
                    </div>
                </div>
            );
        }

        const thicknessMap = {
            veryThick: t("products.veryThick"),
            thick: t("products.thick"),
            medium: t("products.medium"),
            mediumThin: t("products.mediumThin"),
            thin: t("products.thin"),
            veryThin: t("products.veryThin")
        };

        return (
            <div
                className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowDetailsModal(false);
                    }
                }}
            >
                <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn mx-auto my-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center z-10 shadow-sm">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#005E77] pr-8 sm:pr-10 break-words">
                            {productData.range}
                        </h3>
                        <button
                            onClick={() => setShowDetailsModal(false)}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                            aria-label={t("products.close")}
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6">
                        {/* Таблица с описанием */}
                        <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
                            <div className="inline-block min-w-full align-middle">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-[#0BBD83] text-white">
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.range")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.thickness")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.yarnType")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.spinningType")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{productData.range}</td>
                                            <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{thicknessMap[productData.thickness] || productData.thickness}</td>
                                            <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm">{productData.yarnType}</td>
                                            <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{productData.spinningType}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Модальное окно для применения продукта
    const ProductApplicationModal = () => {
        if (!showApplicationModal || !selectedProduct) return null;

        const productData = findProductData(selectedProduct.title);
        if (!productData) {
        return (
            <div
                className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowApplicationModal(false);
                    }
                }}
            >
                    <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn mx-auto my-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center z-10 shadow-sm">
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#005E77] pr-8 sm:pr-10 break-words">
                                {productData?.range || selectedProduct.title} - {t("products.application")}
                            </h3>
                            <button
                                onClick={() => setShowApplicationModal(false)}
                                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                                aria-label={t("products.close")}
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-3 sm:p-4 md:p-6">
                            <p className="text-center text-gray-500 text-sm sm:text-base">Информация о применении данного продукта пока недоступна.</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div
                className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowApplicationModal(false);
                    }
                }}
            >
                <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn mx-auto my-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center z-10 shadow-sm">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#005E77] pr-8 sm:pr-10 break-words">
                            {productData.range} - {t("products.application")}
                        </h3>
                        <button
                            onClick={() => setShowApplicationModal(false)}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                            aria-label={t("products.close")}
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6">
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6">
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black leading-relaxed">
                                {productData.application}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const YarnCodesModal = () => {
        if (!showDetailsModal || selectedProductType !== "codes") return null;

        return (
            <div
                className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowDetailsModal(false);
                    }
                }}
            >
                <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn mx-auto my-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center z-10 shadow-sm">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#005E77] pr-8 sm:pr-10 break-words">{t("products.yarnCodes")}</h3>
                        <button
                            onClick={() => setShowDetailsModal(false)}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                            aria-label={t("products.close")}
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-3 sm:p-4 md:p-6">
                        <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
                            <div className="inline-block min-w-full align-middle">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-[#0BBD83] text-white">
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold">№</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold">{t("products.yarnType")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold">{t("products.description")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{t("products.range")} Ne</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold">{t("products.code")}</th>
                                            <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs md:text-sm font-semibold">{t("products.example")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yarnCodes.map((yc, idx) => {
                                            const codeKey = yc.code === "KCD" ? "cardedRingSpun" :
                                                           yc.code === "KCM" ? "combedRingSpun" :
                                                           yc.code === "CPS" ? "compactSpun" :
                                                           yc.code === "SLB" ? "slubYarn" :
                                                           yc.code === "LYC" ? "lycraCoreSpun" : "dualCoreYarn";
                                            return (
                                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm">{idx + 1}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-[10px] sm:text-xs md:text-sm">{t(`products.yarnCodesTable.${codeKey}`)}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm">{t(`products.yarnCodesTable.${codeKey}Desc`)}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{yc.range}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-bold text-[#005E77] text-[10px] sm:text-xs md:text-sm">{yc.code}</td>
                                                    <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[#0BBD83] text-[10px] sm:text-xs md:text-sm">{yc.example}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <section id="OurProduct" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
                    {/* Заголовок и фильтры */}
                    <div className="text-center mb-10 sm:mb-12 md:mb-14">
                        <h2 className="text-[34px] sm:text-[38px] md:text-[40px] lg:text-[42px] font-medium text-black mb-6 sm:mb-8 md:mb-10">
                            {t("products.title")}
                        </h2>

                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 max-w-3xl mx-auto text-[#005E77]">
                            <input
                                type="text"
                                placeholder={t("products.search")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border border-[#005E77] rounded-lg px-4 md:px-5 py-2 md:py-2.5 max-w-[278px] md:max-w-[300px] max-h-[54px] md:max-h-[58px] text-sm md:text-base focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all duration-300"
                            />

                            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                                {["KCD", "KCM", "CPS", "SLB", "LYC", "DCR"].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => handleFilterClick(filter)}
                                        className={`border border-[#005E77] rounded-lg px-[15px] md:px-[18px] py-[10px] md:py-[12px] text-sm md:text-base font-medium transition-all duration-300 ${
                                            selectedFilter === filter
                                                ? "bg-[#005E77] text-white"
                                                : "text-[#005E77] bg-transparent hover:text-white hover:bg-[#005E77]"
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Кнопки для просмотра детальной информации */}
                        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 justify-center mt-5 sm:mt-6 md:mt-8">
                            <button
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setSelectedProductType("cotton");
                                    setShowDetailsModal(true);
                                }}
                                className="px-4 md:px-5 py-2 md:py-2.5 bg-[#0BBD83] text-white rounded-lg hover:bg-[#0aa775] transition-all duration-300 text-sm md:text-base font-medium cursor-pointer"
                            >
                                {t("products.cottonYarnRange")}
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setSelectedProductType("slub");
                                    setShowDetailsModal(true);
                                }}
                                className="px-4 md:px-5 py-2 md:py-2.5 bg-[#0BBD83] text-white rounded-lg hover:bg-[#0aa775] transition-all duration-300 text-sm md:text-base font-medium cursor-pointer"
                            >
                                {t("products.slubYarn")}
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setSelectedProductType("lycra");
                                    setShowDetailsModal(true);
                                }}
                                className="px-4 md:px-5 py-2 md:py-2.5 bg-[#0BBD83] text-white rounded-lg hover:bg-[#0aa775] transition-all duration-300 text-sm md:text-base font-medium cursor-pointer"
                            >
                                {t("products.lycraYarn")}
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setSelectedProductType("codes");
                                    setShowDetailsModal(true);
                                }}
                                className="px-4 md:px-5 py-2 md:py-2.5 border-2 border-[#0BBD83] text-[#0BBD83] rounded-lg hover:bg-[#f3fef9] transition-all duration-300 text-sm md:text-base font-medium cursor-pointer"
                            >
                                {t("products.yarnCodes")}
                            </button>
                        </div>
                    </div>

                    {/* Сетка продуктов */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-8 mb-8 justify-items-center px-4 md:px-8">
                        {visibleProducts.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 text-base md:text-lg">
                                {t("products.search")} - нет результатов
                            </div>
                        ) : (
                            visibleProducts.map(({ id, img, title }) => (
                            <div
                                key={id}
                                className="bg-white rounded-lg border border-[#0BBD83] p-5 sm:p-6 md:p-7 hover:shadow-lg hover:shadow-[#0BBD83]/40
                transition-all duration-300 w-full max-w-[380px] md:max-w-[400px] lg:max-w-[420px] flex flex-col justify-between hover:border-[#0BBD83]"
                            >
                                {/* Изображение */}
                                <div className="flex items-center justify-center bg-gray-50 rounded-lg mb-4 sm:mb-5 h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]">
                                    <img
                                        src={img}
                                        alt="Yarn Product"
                                        className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Кнопки */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 sm:justify-between">
                                    <button
                                        onClick={() => {
                                            setSelectedProduct({ id, img, title });
                                            setShowDetailsModal(true);
                                        }}
                                        className="w-full sm:w-[150px] md:w-[160px] h-[50px] sm:h-[44px] md:h-[48px] bg-[#0BBD83] text-white text-[15px] sm:text-sm md:text-base font-semibold rounded-[10px]
                    hover:bg-[#0aa775] transition-all duration-300 active:scale-[0.98]"
                                    >
                                        {t("products.viewMore")}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedProduct({ id, img, title });
                                            setShowApplicationModal(true);
                                        }}
                                        className="w-full sm:w-[150px] md:w-[160px] h-[50px] sm:h-[44px] md:h-[48px] border border-[#0BBD83] text-[#0BBD83] text-[15px] sm:text-sm md:text-base font-semibold rounded-[10px]
                    bg-transparent hover:bg-[#f3fef9] transition-all duration-300 active:scale-[0.98]"
                                    >
                                        {t("products.application")}
                                    </button>
                                </div>
                            </div>
                        ))
                        )}
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

            {/* Модальные окна */}
            <YarnTypeModal />
            <ProductDescriptionModal />
            <ProductApplicationModal />
            {selectedProductType === "codes" && <YarnCodesModal />}
        </div>
    );
};

export default OurProducts;

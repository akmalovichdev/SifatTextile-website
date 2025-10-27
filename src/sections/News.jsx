"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Статические данные для fallback
const staticNews = [
    {
        title: "Core Spun Yarn против Iceland Yarn — какая из них подходит вашему бренду?",
        image: "/News/News_1.jpg",
        content: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность."
    },
    {
        title: "Core Spun Yarn против Iceland Yarn — какая из них подходит вашему бренду?",
        image: "/News/News_2.jpg",
        content: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность."
    },
    {
        title: "Core Spun Yarn против Iceland Yarn — какая из них подходит вашему бренду?",
        image: "/News/News_3.jpg",
        content: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность."
    }
];

const News = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useLanguage();
  const [news, setnews] = useState(staticNews);

  useEffect(() => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') {
      setnews(staticNews);
      return;
    }

    // Имитируем запрос к базе данных через API
    console.log("Загружаем данные новостей...");
    fetch("/data/Data.json")
      .then((res) => {
        console.log("Ответ получен:", res.status);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Данные новостей:", data);
        setnews(data.news || staticNews);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        // Fallback данные
        setnews(staticNews);
      });
  }, []);

  // Отслеживаем ширину экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // mobile и tablet < 1024px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOpen = (index) => {
    if (isMobile) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  console.log("Количество новостей:", news.length);

  return (
    <section className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] bg-gray-50  py-12 sm:py-16 ">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12 text-black">
        {t("news.title")}
      </h2>

      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {news.length === 0 ? (
          <div className="text-center text-gray-500">
            Загрузка новостей...
          </div>
        ) : (
          news.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              onClick={() => toggleOpen(i)}
              className={`group relative overflow-hidden rounded-xl border border-[#005E77] shadow-md transition-all duration-700 w-full max-w-[1660px]
            ${isMobile ? "cursor-pointer" : ""}
            `}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0  backdrop-blur-xs transition-all duration-700" />

              <div
                className={`relative overflow-hidden transition-all duration-700 ${isMobile
                  ? isOpen
                    ? "max-h-[418px]"
                    : "max-h-[180px]"
                  : "group-hover:max-h-[418px] max-h-[180px] sm:max-h-[200px]"
                  }`}
              >
                <div className="relative z-10 flex items-center justify-center h-[180px] sm:h-[200px] px-4">
                  <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold text-center drop-shadow-md leading-tight">
                    {item.title}
                  </h3>
                </div>

                <div
                  className={`relative z-10 p-4 sm:p-6 transition-all duration-700
                ${isMobile
                      ? isOpen
                        ? "opacity-100 max-h-[220px]"
                        : "opacity-0 max-h-0"
                      : "opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[218px]"
                    }
                `}
                >
                  <p className="text-black text-base sm:text-lg md:text-xl font-medium leading-relaxed text-center sm:text-left">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>

          );
        })
        )}
      </div>
    </section>
  );
};

export default News;

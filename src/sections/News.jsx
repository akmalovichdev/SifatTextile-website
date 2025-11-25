"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Статические данные для fallback
const staticNews = [
    {
        title: "Core Spun Yarn против Iceland Yarn — какая из них подходит вашему бренду?",
        subtitle: "Сравнение типов пряжи",
        image: "/News/News_1.jpg",
        content: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность.",
        fullText: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность. Пряжа Bulk Iceland привлекает производителей одежды, ориентированных на экологичность и ищущих устойчивую новизну. Сети производителей основ пряжи обещают постоянный контроль толщины и быстрые сроки поставки. Поставщики переработанной толстой пряжи подчеркивают круговую экономику для современных модных брендов."
    },
    {
        title: "Core Spun Yarn против Iceland Yarn — какая из них подходит вашему бренду?",
        subtitle: "Сравнение типов пряжи",
        image: "/News/News_2.jpg",
        content: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность.",
        fullText: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность. Пряжа Bulk Iceland привлекает производителей одежды, ориентированных на экологичность и ищущих устойчивую новизну. Сети производителей основ пряжи обещают постоянный контроль толщины и быстрые сроки поставки. Поставщики переработанной толстой пряжи подчеркивают круговую экономику для современных модных брендов."
    },
    {
        title: "Core Spun Yarn против Iceland Yarn — какая из них подходит вашему бренду?",
        subtitle: "Сравнение типов пряжи",
        image: "/News/News_3.jpg",
        content: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность.",
        fullText: "Основа пряжи обеспечивает прочную устойчивость, обернутую в элегантные слои волокон. Исландская пряжа сочетает 50% чистого акрила и 50% переработанного акрила, предлагая пышность. Пряжа Bulk Iceland привлекает производителей одежды, ориентированных на экологичность и ищущих устойчивую новизну. Сети производителей основ пряжи обещают постоянный контроль толщины и быстрые сроки поставки. Поставщики переработанной толстой пряжи подчеркивают круговую экономику для современных модных брендов."
    }
];

const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  const [news, setnews] = useState(staticNews);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    // Сброс состояния при монтировании
    setIsTransitioning(false);

    if (typeof window === 'undefined') {
      setnews(staticNews);
      return;
    }

    fetch("/data/Data.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Обработка данных из JSON - добавляем fullText если его нет
        const processedNews = (data.news || staticNews).map(item => ({
          ...item,
          subtitle: item.subtitle || "Новость",
          fullText: item.fullText || item.content || ""
        }));
        setnews(processedNews);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setnews(staticNews);
      });
  }, []);

  const nextSlide = useCallback(() => {
    if (news.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % news.length);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [news.length]);

  const prevSlide = useCallback(() => {
    if (news.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [news.length]);

  const goToSlide = useCallback((index) => {
    if (index === currentIndex || news.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [currentIndex, news.length]);

  const handleReadMore = (item) => {
    setSelectedNews(item);
    setShowModal(true);
  };

  // Автоматическая смена слайдов с паузой при наведении
  useEffect(() => {
    if (isPaused || news.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, news.length]);

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  if (news.length === 0) {
    return (
      <section className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] bg-gray-50 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12 text-black">
          {t("news.title")}
        </h2>
        <div className="text-center text-gray-500">Загрузка новостей...</div>
      </section>
    );
  }

  // Мемоизация трансформации для оптимизации
  const transformValue = useMemo(() => {
    return `translate3d(-${currentIndex * 100}%, 0, 0)`;
  }, [currentIndex]);

  return (
    <>
      <section className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px] bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-black">
          {t("news.title")}
        </h2>

        <div
          className="relative max-w-[1660px] mx-auto w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Карусель */}
          <div className="relative overflow-hidden rounded-xl" style={{ width: '100%' }}>
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out will-change-transform"
              style={{
                transform: transformValue,
                backfaceVisibility: 'hidden',
                perspective: 1000
              }}
            >
              {news.map((item, i) => (
                <div
                  key={`news-${i}-${item.title}`}
                  className="flex-shrink-0"
                  style={{
                    width: '100%',
                    minWidth: '100%',
                    maxWidth: '100%',
                    flexBasis: '100%'
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl border border-gray-300 shadow-lg bg-white" style={{ width: '100%' }}>
                    {/* Изображение */}
                    <div className="relative h-[200px] sm:h-[250px] md:h-[320px] lg:h-[350px] xl:h-[400px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={i === 0 ? "high" : "low"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Контент */}
                    <div className="relative bg-white p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10">
                      <h3 className="text-black text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed mb-4 sm:mb-5 md:mb-6">
                        {item.content}
                      </p>

                      {/* Кнопка Подробнее */}
                      <div className="flex justify-center sm:justify-start">
                        <button
                          onClick={() => handleReadMore(item)}
                          className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-[10px] text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 active:scale-[0.98]"
                        >
                          {t("news.readMore")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки навигации */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0BBD83] rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all duration-200 z-10 active:scale-95"
            aria-label="Предыдущий слайд"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0BBD83] rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all duration-200 z-10 active:scale-95"
            aria-label="Следующий слайд"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Индикаторы */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-5 sm:mt-6 md:mt-8">
            {news.map((_, i) => (
              <button
                key={`indicator-${i}`}
                onClick={() => goToSlide(i)}
                className={`h-2 sm:h-3 md:h-3 rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? "bg-[#0BBD83] w-8 sm:w-10 md:w-12"
                    : "bg-gray-300 w-2 sm:w-3 md:w-4 hover:bg-gray-400"
                } active:scale-95`}
                aria-label={`Перейти к слайду ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      {showModal && selectedNews && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn mx-auto my-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex justify-between items-start z-10 shadow-sm">
              <div className="flex-1 pr-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#005E77] mb-2 sm:mb-3 break-words">
                  {selectedNews.title}
                </h3>
                {selectedNews.subtitle && (
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium">
                    {selectedNews.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="flex-shrink-0 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl md:text-4xl font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              {selectedNews.image && (
                <div className="mb-4 sm:mb-6 rounded-lg overflow-hidden">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
                  />
                </div>
              )}
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed whitespace-pre-line">
                  {selectedNews.fullText || selectedNews.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default News;

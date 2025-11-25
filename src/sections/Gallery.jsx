"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const Gallery = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [galleryImages, setGalleryImages] = useState([
    "/Gallery/Gallery_1.png",
    "/Gallery/Gallery_2.png",
    "/Gallery/Gallery_3.png",
    "/Gallery/Gallery_4.png",
    "/Gallery/Gallery_5.png",
    "/Gallery/Gallery_6.png",
    "/Gallery/Gallery_7.png"
  ]);

  useEffect(() => {
    fetch("/data/Data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.gallery && Array.isArray(data.gallery)) {
          setGalleryImages(data.gallery);
        }
      })
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
        {/* Заголовок */}
        <h2 className="text-black font-medium text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          {t("gallery.title")}
        </h2>

        {/* ГАЛЕРЕЯ */}
        <div className="max-w-[1660px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Первая картинка - большая */}
            {galleryImages[0] && (
              <div className={`sm:col-span-2 lg:row-span-2 ${isMobile && !showAll ? "hidden" : ""}`}>
                <img
                  src={galleryImages[0]}
                  alt="Gallery Image 1"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Вторая картинка */}
            {galleryImages[1] && (
              <div className={isMobile && !showAll ? "hidden" : ""}>
                <img
                  src={galleryImages[1]}
                  alt="Gallery Image 2"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Третья картинка */}
            {galleryImages[2] && (
              <div className={isMobile && !showAll ? "hidden" : ""}>
                <img
                  src={galleryImages[2]}
                  alt="Gallery Image 3"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Четвертая картинка */}
            {galleryImages[3] && (
              <div className={isMobile && !showAll ? "hidden" : ""}>
                <img
                  src={galleryImages[3]}
                  alt="Gallery Image 4"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Пятая картинка */}
            {galleryImages[4] && (
              <div className={`sm:col-span-2 ${isMobile && !showAll ? "hidden" : ""}`}>
                <img
                  src={galleryImages[4]}
                  alt="Gallery Image 5"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Шестая картинка */}
            {galleryImages[5] && (
              <div className={isMobile && !showAll ? "hidden" : ""}>
                <img
                  src={galleryImages[5]}
                  alt="Gallery Image 6"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Седьмая картинка */}
            {galleryImages[6] && (
              <div className={isMobile && !showAll ? "hidden" : ""}>
                <img
                  src={galleryImages[6]}
                  alt="Gallery Image 7"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>

        {/* Кнопка "Показать все / Скрыть" для мобильной версии */}
        {isMobile && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
                bg-[#0BBD83] text-white font-semibold
                px-6 py-3 rounded-lg
                transition-all duration-300
                hover:bg-[#0aa775]
              "
            >
              {showAll ? t("gallery.hideAll") : t("gallery.showAll")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

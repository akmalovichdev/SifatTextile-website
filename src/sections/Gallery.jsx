import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-white pt-16 pb-[208px] px-4">
      <div className="max-w-[1920px] mx-auto">
        {/* Заголовок */}
        <p className="text-black font-medium text-[32px] sm:text-[36px] md:text-[40px] text-center mb-[50px] sm:mb-[70px]">
          Галерея
        </p>

        {/* ГАЛЕРЕЯ */}
        <div className="flex flex-col gap-4 items-center">
          {/* Верхний ряд */}
          <div
            className="
              grid gap-4 justify-center
              grid-cols-1 sm:grid-cols-2
              xl:grid-cols-[minmax(300px,30%)_minmax(500px,70%)]
              w-full max-w-[95vw] xl:max-w-[1660px]
            "
          >
            <img
              src="/Gallery/Gallery_1.png"
              alt="Image 1"
              className="w-full h-auto object-cover rounded-lg"
            />
            <img
              src="/Gallery/Gallery_2.png"
              alt="Image 2"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Средний ряд */}
          <div
            className={`
              grid gap-4 justify-center
              grid-cols-1 sm:grid-cols-2 md:grid-cols-3
              xl:grid-cols-[minmax(300px,33%)_minmax(300px,30%)_minmax(300px,37%)]
              w-full max-w-[95vw] xl:max-w-[1660px]
              ${isMobile && !showAll ? "hidden" : ""}
            `}
          >
            <img
              src="/Gallery/Gallery_3.png"
              alt="Image 3"
              className="w-full h-auto object-cover rounded-lg"
            />
            <img
              src="/Gallery/Gallery_4.png"
              alt="Image 4"
              className="w-full h-auto object-cover rounded-lg"
            />
            <img
              src="/Gallery/Gallery_5.png"
              alt="Image 5"
              className="hidden md:block w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Нижний ряд */}
          <div
            className={`
              grid gap-4 justify-center
              grid-cols-1 sm:grid-cols-2
              xl:grid-cols-[minmax(400px,50%)_minmax(400px,50%)]
              w-full max-w-[95vw] xl:max-w-[1660px]
              ${isMobile && !showAll ? "hidden" : ""}
            `}
          >
            <img
              src="/Gallery/Gallery_6.png"
              alt="Image 6"
              className="w-full h-auto object-cover rounded-lg"
            />
            <img
              src="/Gallery/Gallery_7.png"
              alt="Image 7"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Кнопка “Показать все / Скрыть” для мобильной версии */}
        {isMobile && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
                bg-[#005E77] text-white font-semibold
                px-6 py-3 rounded-lg
                transition-all duration-300
                hover:bg-[#007b99]
              "
            >
              {showAll ? "Скрыть" : "Показать все"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

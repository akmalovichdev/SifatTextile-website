"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ContactModal from '@/components/ContactModal';

const AboutUs = () => {
  const { t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [images, setImages] = useState({
    image1: "/AboutUs/AboutUs_1.png",
    image2: "/AboutUs/AboutUs_2.png",
    image3: "/AboutUs/AboutUs_3.png",
    image4: "/AboutUs/AboutUs_4.png"
  });

  useEffect(() => {
    fetch("/data/Data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.aboutUs) {
          setImages(data.aboutUs);
        }
      })
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  return (
    <div>
      <section id="AboutUs" className=" bg-white">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
          <div className="flex flex-col 2xl:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-10">

            {/* Галерея картинок */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 2xl:w-auto relative">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src={images.image1}
                    alt="Factory Worker"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src={images.image2}
                    alt="Cotton Field"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 md:pt-20 sm:pt-16">
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src={images.image3}
                    alt="Factory Worker"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src={images.image4}
                    alt="Textile Machinery"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Текстовая часть */}
            <div className="flex flex-col justify-center space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-[38px] lg:text-[40px] xl:text-[42px] font-medium text-black">{t("about.title")}</h2>

              <div className="space-y-5 sm:space-y-6 md:space-y-7 text-black leading-relaxed text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-normal">
                <p>
                  {t("about.description1").split(/(Sifat Textile)/gi).map((part, index) =>
                    part.toLowerCase() === 'sifat textile' ? (
                      <span key={index} className="font-semibold text-[#005E77]">Sifat Textile</span>
                    ) : (
                      part
                    )
                  )}
                </p>
                <p>
                  {t("about.description2")}
                </p>
              </div>

              <div className='text-center'>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-auto sm:w-auto md:w-[240px] lg:w-[260px] xl:w-[300px] xl:h-[80px] bg-[#0BBD83] text-white h-[54px] sm:h-[58px] md:h-[64px] lg:h-[70px] px-6 md:px-8 text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold rounded-[10px] hover:bg-[#0aa775] transition duration-300 cursor-pointer"
                >
                  {t("about.btnLearn")}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}

export default AboutUs

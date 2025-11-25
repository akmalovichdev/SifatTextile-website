"use client"

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";


export default function ServicesSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    comments: "",
  })

  const [ourServises, setourServises] = useState([]);

  useEffect(() => {
    // Имитируем запрос к базе данных через API
    fetch("/data/Data.json")
      .then((res) => res.json())
      .then((data) => setourServises(data.ourServises))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  const [isFormVisible, setIsFormVisible] = useState(false)

  const services = [
    t("services.factoryYarn"),
  ]

  const processBlocks = [
    {
      title: t("ourServises.processTitle"),
      intro: t("ourServises.processIntro"),
      text: [],
      img: "/OurServises/OurServises_2.png",
    },
    {
      title: t("ourServises.process1Title"),
      text: [t("ourServises.process1Text")],
      img: "/OurServises/OurServises_3.png",
    },
    {
      title: t("ourServises.process2Title"),
      text: [t("ourServises.process2Text")],
      img: "/OurServises/OurServises_4.png",
    },
    {
      title: t("ourServises.process3Title"),
      text: [t("ourServises.process3Text")],
      img: "/OurServises/OurServises_5.png",
    },
    {
      title: t("ourServises.process4Title"),
      text: [t("ourServises.process4Text")],
      img: "/OurServises/OurServises_6.png",
    },
    {
      title: t("ourServises.process5Title"),
      text: [t("ourServises.process5Text")],
      img: "/OurServises/OurServises_2.png",
    },
    {
      title: t("ourServises.process6Title"),
      text: [t("ourServises.process6Text")],
      img: "/OurServises/OurServises_3.png",
    },
    {
      title: t("ourServises.process7Title"),
      text: [t("ourServises.process7Text")],
      img: "/OurServises/OurServises_4.png",
    },
    {
      title: t("ourServises.process8Title"),
      text: [t("ourServises.process8Text")],
      img: "/OurServises/OurServises_5.png",
    },
    {
      title: t("ourServises.process9Title"),
      text: [t("ourServises.process9Text")],
      img: "/OurServises/OurServises_6.png",
    },
    {
      title: "",
      text: [t("ourServises.processConclusion")],
      img: null,
      isConclusion: true,
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="bg-white">
      <section id="OurServises" className="max-w-[1920px] mx-auto px-3 sm:px-4 py-8 sm:py-16 pt-[80px] sm:pt-[150px]">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-14 text-gray-900">
          {t("services.title")}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-[70px]">
          {services.map((service, index) => (
            <button
              key={index}
              className="px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-[10px] border-2 border-[#005E77] text-[#005E77]
                 hover:bg-[#005E77] hover:text-white transition-colors duration-200
                 text-sm sm:text-base md:text-xl font-medium"
            >
              {service}
            </button>
          ))}
        </div>

        <div
          className="flex flex-col-reverse lg:flex-row items-center lg:items-start
          justify-center gap-6 md:gap-10 xl:gap-[81px]"
        >
          <div className="max-w-[832px] text-black font-normal text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed text-center lg:text-left">
            <p className="mb-3 sm:mb-6">
              <span className="font-semibold text-[#005E77]">Sifat Textile</span> {t("ourServises.intro")}
            </p>

            <ul className="mb-6 sm:mb-[46px] space-y-1 sm:space-y-2">
              {[
                t("ourServises.servicesList1"),
                t("ourServises.servicesList2"),
                t("ourServises.servicesList3"),
                t("ourServises.servicesList4"),
              ].map((item, i) => (
                <li key={i} className="flex items-start justify-center lg:justify-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <ul className="space-y-1 sm:space-y-2">
              {[
                t("ourServises.features1"),
                t("ourServises.features2"),
                t("ourServises.features3"),
                t("ourServises.features4"),
              ].map((item, i) => (
                <li key={i} className="flex items-start justify-center lg:justify-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

              <button
              onClick={() => setIsFormVisible(true)}
              className="bg-[#0BBD83] hover:bg-teal-700 text-white
             px-5 py-3 sm:px-6 sm:py-4 rounded-[10px]
             text-sm sm:text-lg md:text-xl font-medium mt-5 sm:mt-[55px]
             whitespace-nowrap cursor-pointer transition-all duration-300"
            >
              {t("services.contactBtn")}
            </button>
          </div>

          <div className="relative w-full max-w-[500px] sm:max-w-[747px] h-[200px] sm:h-[365px] md:h-[465px] rounded-lg overflow-hidden">
            {ourServises ? (
              <img
                src={ourServises.video}
                alt="Factory Video"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            ) : (
              // Плейсхолдер (например, серая заливка или скелет)
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-[1920px] mx-auto px-3 sm:px-4 flex flex-col lg:flex-row-reverse justify-center gap-10 relative">
          <div
            className="hidden lg:block lg:sticky top-[100px] self-start
              w-full sm:w-[420px] md:w-[450px] lg:max-w-[480px]
              bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200
              rounded-2xl p-6 shadow-xl ml-auto mr-[4%]"
          >
            <h3 className="text-lg md:text-xl font-semibold text-black mb-3">
              {t("services.getPrice")}
            </h3>
            <p className="text-base md:text-xl font-normal text-black mb-5">
              {t("services.contactSales")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {[t("services.formName"), t("services.formEmail"), t("services.formCompany"), t("services.formPhone")].map(
                (placeholder, i) => {
                  const key = ["name", "email", "company", "phone"][i]
                  return (
                    <input
                      key={i}
                      type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                      placeholder={placeholder}
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                      className="text-base md:text-lg font-normal text-[#0BBD83] w-full h-[50px] py-2 px-6 bg-white border border-[#0BBD83] rounded-[10px]"
                    />
                  )
                }
              )}
              <textarea
                placeholder={t("services.formComment")}
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
                className="text-base md:text-lg font-normal text-[#0BBD83] w-full h-[100px] py-2 px-6 bg-white border border-[#0BBD83] rounded-[10px] resize-none"
              ></textarea>

              <button
                type="submit"
                className="text-center w-full h-[50px] bg-[#0BBD83] hover:bg-teal-700 text-white
                rounded-[10px] text-base md:text-lg font-medium transition-all"
              >
                {t("services.formSubmit")}
              </button>
            </form>
          </div>

          {/* Popup форма (mobile) */}
          {isFormVisible && (
            <div className="fixed inset-0 bg-black/40 z-[10000] flex items-center justify-center px-4">
              <div className="relative bg-gradient-to-br from-teal-50 to-white w-full max-w-[500px] rounded-2xl p-6 border-2 border-teal-200 shadow-2xl">
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                >
                  ×
                </button>

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">
                  {t("services.getPrice")}
                </h3>
                <p className="text-base sm:text-xl font-normal text-black mb-5">
                  {t("services.contactSales")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {[t("services.formName"), t("services.formEmail"), t("services.formCompany"), t("services.formPhone")].map(
                    (placeholder, i) => {
                      const key = ["name", "email", "company", "phone"][i]
                      return (
                        <input
                          key={i}
                          type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                          placeholder={placeholder}
                          value={formData[key]}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                          }
                          className="text-base sm:text-lg font-normal text-[#0BBD83] w-full h-[50px] py-2 px-6 bg-white border border-[#0BBD83] rounded-[10px]"
                        />
                      )
                    }
                  )}
                  <textarea
                    placeholder={t("services.formComment")}
                    value={formData.comments}
                    onChange={(e) =>
                      setFormData({ ...formData, comments: e.target.value })
                    }
                    className="text-base sm:text-lg font-normal text-[#0BBD83] w-full h-[100px] py-2 px-6 bg-white border border-[#0BBD83] rounded-[10px] resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="text-center w-full h-[50px] bg-[#0BBD83] hover:bg-teal-700 text-white
                    rounded-[10px] text-base sm:text-lg font-medium transition-all"
                  >
                    {t("services.formSubmit")}
                  </button>
                </form>
              </div>
            </div>
          )}

          {!isFormVisible && (
            <button
              onClick={() => setIsFormVisible(true)}
              className="fixed bottom-6 right-6 bg-[#0BBD83] hover:bg-teal-700 text-white
              rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-2xl sm:text-3xl shadow-lg z-30 lg:hidden"
            >
              💬
            </button>
          )}

          {/* Контент */}
          <div className="flex-1 space-y-12 sm:space-y-16">
            {processBlocks.map((block, index) => (
              <div key={index}>
                <div className="space-y-4 sm:space-y-5 max-w-[1053px] mx-auto">
                  {block.title && (
                    <h2 className="text-lg sm:text-2xl font-semibold text-black text-center lg:text-left">
                      {block.title}
                    </h2>
                  )}

                  {block.intro && (
                    <p className="text-sm sm:text-lg md:text-xl font-normal leading-relaxed text-center lg:text-left">
                      {block.intro}
                    </p>
                  )}

                  {block.text && block.text.length > 0 && (
                    <p className={`text-sm sm:text-lg md:text-xl font-normal leading-relaxed ${block.isConclusion ? 'text-center lg:text-left font-semibold' : ''}`}>
                      {block.text.map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < block.text.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                </div>

                {block.img && (
                  <div className="mt-6 sm:mt-10 rounded-lg overflow-hidden max-w-[1029px] mx-auto">
                    <img
                      src={block.img}
                      alt="Производство"
                      className="w-full h-[220px] sm:h-[350px] md:h-[465px] object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}

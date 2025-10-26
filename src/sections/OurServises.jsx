"use client"

import React, { useState, useEffect } from "react";


export default function ServicesSection() {
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
    fetch("/Data/Data.json")
      .then((res) => res.json())
      .then((data) => setourServises(data.ourServises))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  const [isFormVisible, setIsFormVisible] = useState(false)

  const services = [
    "Фабрика основной пряжи",
    "Фабрика перьевой пряжи",
    "Фабрика крытой пряжи",
    "Фабрика смеcевой пряжи",
    "Фабрика нейлоновой пряжи",
    "Фабрика шерстяной пряжи",
    "Фабрика полиэфирной пряжи",
  ]

  const processBlocks = [
    {
      title: "Процесс производства пряжи",
      text: [
        "На нашем заводе стержневой пряжи производство стержневой пряжи разделено на следующие процессы:",
        "вскрытие и очистка → кардочесание → рисование → ровница → прядение → постобработка. ",
        "После этой серии процессов выбранное штапельное волокно в конечном итоге станет готовой пряжей стержневого прядения."
      ],
      img: "/OurServises/OurServises_2.png",
    },
    {
      title: "1. Процесс открытия и очистки",
      text: [
        "Открытие и очистка — это первый процесс после попадания штапельного волокна в стержневая пряжа фабрика. В этом процессе короткое волокно превращается в однородный рулон, чтобы создать условия для процесса чесания. ",
        "Основными задачами этого процесса являются:",
        "(1) Разрыхление: за счет разрыва и выдувания штифтовых гвоздей, бичей в каждой отдельной машине очистки и очистки, сжатые блочные волокна в пакете волокон разрыхляются на небольшие пучки волокон весом 0.3-0.5 г, которые используется для удаления загрязнений и очистки. Смешивание создает условия для разделения на отдельные волокна. Минимизируйте фрагментацию мусора и повреждение волокна во время вскрытия.",
        "(2) Удаление примесей: одновременное удаление от 50% до 60% примесей из хлопка-сырца должно уменьшить выпадение прядильных волокон и сохранить волокна.",
        "(3) Смешивание: Смешайте все виды сырья в пропорции, фибриллы будут хорошо разрыхлены, а смешивание будет более равномерным.",
        "(4) Равномерный рулон: сделайте рулон определенного веса, определенной длины и однородного волокна для следующего процесса."],
      img: "/OurServises/OurServises_3.png",
    },
    {
      title: "2. Процесс кардочесания",
      text: [
        "Открытие и очистка — это первый процесс после попадания штапельного волокна в стержневая пряжа фабрика. В этом процессе короткое волокно превращается в однородный рулон, чтобы создать условия для процесса чесания. ",
        "После комбинированной машинной обработки раскрытия и очистки волокна в волокнистом рулоне в основном находятся в состоянии рыхлых волокнистых блоков и пучков волокон и содержат от 40% до 50% примесей, большинство из которых представляют собой мелкие и высокоадгезивные волокнистые примеси. Необходимо полностью разложить пучок волокон на отдельные волокна, удалить оставшиеся в нем мелкие примеси, полностью перемешать каждое компонентное волокно в состоянии одного волокна и сделать однородную прядь, чтобы удовлетворить требованиям последующего процесса производство пряжи с сердечником."
      ],
      img: "/OurServises/OurServises_4.png",
    },
    {
      title: "3. Процесс рисования",
      text: [
        "Открытие и очистка — это первый процесс после попадания штапельного волокна в стержневая пряжа фабрика. В этом процессе короткое волокно превращается в однородный рулон, чтобы создать условия для процесса чесания.",
        "После комбинированной машинной обработки раскрытия и очистки волокна в волокнистом рулоне в основном находятся в состоянии рыхлых волокнистых блоков и пучков волокон и содержат от 40% до 50% примесей, большинство из которых представляют собой мелкие и высокоадгезивные волокнистые примеси. Необходимо полностью разложить пучок волокон на отдельные волокна, удалить оставшиеся в нем мелкие примеси, полностью перемешать каждое компонентное волокно в состоянии одного волокна и сделать однородную прядь, чтобы удовлетворить требованиям последующего процесса производство пряжи с сердечником."
      ],
      img: "/OurServises/OurServises_5.png",
    },
    {
      title: "4. Передвижной процесс",
      text: [
        "На фабрике по производству основной пряжи ровница является четвертым процессом, и лента может быть переработана в ровницы различной плотности и крутки для процесса прядения.",
        "Задачами бродяжного процесса являются:",
        "(1) Вытягивание: приготовленные полоски равномерно растягиваются и истончаются, а волокна дополнительно выпрямляются и располагаются параллельно.",
        "(2) Скручивание: соответствующее скручивание вытянутой ленты, чтобы лента имела определенную прочность, удобную для намотки и размотки ровницы на прядильной раме."
      ],
      img: "/OurServises/OurServises_6.png",
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
          Наши услуги
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
              Siyob Group Tekstil предлагает комплекс услуг для партнёров в текстильной отрасли:
            </p>

            <ul className="mb-6 sm:mb-[46px] space-y-1 sm:space-y-2">
              {[
                "Carded и Combed Ring Spun (Ne 6/1 – Ne 40/1);",
                "Open End (Ne 6/1 – Ne 20/1);",
                "Slub, Lycra;",
                "Dual Core",
              ].map((item, i) => (
                <li key={i} className="flex items-start justify-center lg:justify-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <ul className="space-y-1 sm:space-y-2">
              {[
                "Выполняем заказы под требования клиента: толщина, тип пряжи, форма и вид упаковки.",
                "Надёжные поставки в Китай, Турцию, Египет, Иран и страны Европы с полным документальным сопровождением.",
                "Многоуровневый контроль на всех этапах производства и соответствие международным стандартам.",
                "Персональные консультации и сопровождение для каждого партнёра.",
              ].map((item, i) => (
                <li key={i} className="flex items-start justify-center lg:justify-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              className="bg-[#0BBD83] hover:bg-teal-700 text-white 
             px-5 py-3 sm:px-6 sm:py-4 rounded-[10px] 
             text-sm sm:text-lg md:text-xl font-medium mt-5 sm:mt-[55px]
             whitespace-nowrap"
            >
              Свяжитесь с нами
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
            <button className="absolute inset-0 flex items-center justify-center group">
              <div
                className="w-8 sm:w-14 md:w-16 h-8 sm:h-14 md:h-16 rounded-full bg-white/90 
                     flex items-center justify-center 
                     group-hover:bg-white transition-colors"
              >
                <div
                  className="w-0 h-0 border-t-[6px] sm:border-t-[9px] md:border-t-[10px] border-t-transparent 
                       border-l-[10px] sm:border-l-[16px] md:border-l-[18px] border-l-teal-900 
                       border-b-[6px] sm:border-b-[9px] md:border-b-[10px] border-b-transparent ml-1"
                ></div>
              </div>
            </button>
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
              Узнайте стоимость сегодня
            </h3>
            <p className="text-base md:text-xl font-normal text-black mb-5">
              Обратитесь в наш отдел продаж
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {["Имя", "Электронный адрес", "Название компании", "Телефон"].map(
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
                placeholder="Комментарий"
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
                Отправить запрос сейчас
              </button>
            </form>
          </div>

          {/* Popup форма (mobile) */}
          {isFormVisible && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
              <div className="relative bg-gradient-to-br from-teal-50 to-white w-full max-w-[500px] rounded-2xl p-6 border-2 border-teal-200 shadow-2xl">
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                >
                  ×
                </button>

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">
                  Узнайте стоимость сегодня
                </h3>
                <p className="text-base sm:text-xl font-normal text-black mb-5">
                  Обратитесь в наш отдел продаж
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {["Имя", "Электронный адрес", "Название компании", "Телефон"].map(
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
                    placeholder="Комментарий"
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
                    Отправить запрос сейчас
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
                  <h2 className="text-lg sm:text-2xl font-semibold text-black text-center lg:text-left">
                    {block.title}
                  </h2>

                  <p className="text-sm sm:text-lg md:text-xl font-normal leading-relaxed">
                    {block.text.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                <div className="mt-6 sm:mt-10 rounded-lg overflow-hidden max-w-[1029px] mx-auto">
                  <img
                    src={block.img}
                    alt="Производство"
                    className="w-full h-[220px] sm:h-[350px] md:h-[465px] object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}

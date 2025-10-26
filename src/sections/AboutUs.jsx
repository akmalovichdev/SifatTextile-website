import React from 'react'

const AboutUs = () => {
  return (
    <div>
      <section id="AboutUs" className=" bg-white">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
          <div className="flex flex-col 2xl:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-10">

            {/* Галерея картинок */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 2xl:w-[10000px] relative">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src="/AboutUs/AboutUs_1.png"
                    alt="Factory Worker"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src="/AboutUs/AboutUs_2.png"
                    alt="Cotton Field"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 md:pt-20 sm:pt-16">
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src="/AboutUs/AboutUs_3.png"
                    alt="Factory Worker"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden w-full aspect-[277/312]">
                  <img
                    src="/AboutUs/AboutUs_4.png"
                    alt="Textile Machinery"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Текстовая часть */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-black">О нас</h2>

              <div className="space-y-6 text-black leading-relaxed text-base sm:text-base font-normal md:text-xl xl:text-2xl ">
                <p>
                  Siyob Group Textile — это динамично развивающаяся текстильная компания из Самарканда, специализирующаяся на производстве хлопковой пряжи. Мы объединяем три современные фабрики, которые работают в единой системе и позволяют выпускать продукцию, востребованную как на внутреннем, так и на международном рынках.
                </p>
                <p>
                  Каждая из наших фабрик оснащена оборудованием ведущих мировых производителей, что обеспечивает стабильное качество и соответствие продукции международным стандартам. Мы производим широкий ассортимент хлопковой пряжи для разных сегментов текстильной промышленности — от трикотажа до тканей премиального уровня. Мы верим, что успех строится на сочетании трёх факторов: качественного сырья, современных технологий и профессионального подхода.
                </p>
              </div>

              <div className='text-center'>
                <button className="w-auto sm:w-auto md:w-[230px] xl:w-[300px] xl:h-[80px] xl:text-2xl bg-[#0BBD83] text-white h-[54px] md:h-[70px]  px-6 text-xl font-semibold rounded-[10px] hover:bg-[#0aa775] transition duration-300">
                  Узнать больше
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutUs

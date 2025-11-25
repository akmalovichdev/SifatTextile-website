"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const OurProductions = ({ setActiveSection }) => {
    const { t } = useLanguage();
    const [images, setImages] = useState({
        surxon: "/OurProductions/OurProductions_1.png",
        maroqand: "/OurProductions/OurProductions_2.png",
        kamalak: "/OurProductions/OurProductions_3.png"
    });

    useEffect(() => {
        fetch("/data/Data.json")
            .then((res) => res.json())
            .then((data) => {
                if (data.ourProductions) {
                    setImages(data.ourProductions);
                }
            })
            .catch((err) => console.error("Ошибка загрузки:", err));
    }, []);

    const facilities = [
        {
            title: t("footer.surxon"),
            description: t("productions.surxonDesc"),
            image: images.surxon,
            section: "Surxon",
        },
        {
            title: t("footer.maroqand"),
            description: t("productions.maroqandDesc"),
            image: images.maroqand,
            section: "Maroqand",
        },
        {
            title: t("footer.kamalak"),
            description: t("productions.kamalakDesc"),
            image: images.kamalak,
            section: "Kamalak",
        },
    ];

    return (
        <div>
            <main className=" bg-gray-50 pb-16 px-4">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
                    <div className="flex flex-col items-center relative">

                        <h1 className="text-3xl sm:text-[36px] md:text-4xl lg:text-[42px] font-bold text-center mb-12 sm:mb-16 md:mb-20 lg:mb-[70px] mt-20 sm:mt-24 md:mt-28 lg:mt-[140px]">
                            {t("productions.title")}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 justify-items-center">
                            {facilities.map((facility, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden border-2 bg-white border-[#005E77] hover:border-[#005E77] hover:shadow-xl hover:shadow-[#0BBD83]/30
                       transition-all duration-300 rounded-xl w-full sm:max-w-[540px] max-w-[400px] md:max-w-[500px] lg:max-w-[540px] h-auto sm:h-[560px] md:h-[600px] lg:h-[640px] flex flex-col "
                                >
                                    <div className="relative w-full aspect-[540/374] sm:h-[374px] md:h-[350px] lg:h-[374px]">
                                        <img
                                            src={facility.image}
                                            alt={facility.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 md:p-7">
                                        <div>
                                            <div className="text-xl sm:text-2xl md:text-[26px] font-semibold text-black text-center sm:text-left mb-3 sm:mb-4">
                                                {facility.title}
                                            </div>
                                            <p className="font-normal text-base sm:text-lg md:text-xl leading-relaxed text-black text-center sm:text-left">
                                                {facility.description}
                                            </p>
                                        </div>

                                        <div className=" flex justify-center sm:justify-start mt-4 sm:mt-5">
                                            <button
                                                onClick={() => {
                                                    if (setActiveSection && facility.section) {
                                                        setActiveSection(facility.section);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }
                                                }}
                                                className=" w-[141px] sm:w-[165px] md:w-[180px] h-[50px] sm:h-[54px] md:h-[58px] border border-[#005E77] text-[#005E77] text-[15px] sm:text-[16px] md:text-lg font-semibold rounded-[10px]
                             bg-transparent hover:bg-[#f3fef9] transition-all duration-300 active:scale-[0.98] cursor-pointer"
                                            >
                                                {t("productions.viewMore")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>


        </div>
    )
}

export default OurProductions

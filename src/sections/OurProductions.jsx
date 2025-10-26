import React from 'react'

const facilities = [
    {
        title: "SURXON SIFAT TEKSTIL",
        description: "Специализируется на пряже KCD и KCM.",
        image: "/OurProductions/OurProductions_1.png",
    },
    {
        title: "MAROQAND SIFAT TEKSTIL",
        description: "Производит широкий ассортимент: Carded Ring Spun, Open End, Slub yarn, Lycra и Dual Core",
        image: "/OurProductions/OurProductions_2.png",
    },
    {
        title: "KAMALAK TEKSTIL",
        description: "Ориентирована на пряжу KCD и KW.",
        image: "/OurProductions/OurProductions_3.png",
    },
]

const OurProductions = () => {
    return (
        <div>
            <main className=" bg-gray-50 pb-16 px-4">
                <div className="max-w-[1920px] mx-auto px-5 sm:px-5 md:px-7 lg:px-[50px] 2xl:px-[100px]">
                    <div className="flex flex-col items-center relative">

                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-[70px] mt-[140px]">
                            Наши производства
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 justify-items-center">
                            {facilities.map((facility, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden border-2 bg-white border-[#005E77] hover:border-[#005E77] hover:shadow-xl hover:shadow-[#0BBD83]/30
                       transition-all duration-300 rounded-xl w-full sm:max-w-[540px] max-w-[400px] md:max-w-[600px] h-auto sm:h-[560px] md:h-[640px] flex flex-col "
                                >
                                    <div className="relative w-full aspect-[540/374] sm:h-[374px]">
                                        <img
                                            src={facility.image}
                                            alt={facility.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between p-6">
                                        <div>
                                            <div className="text-2xl font-semibold text-black text-center sm:text-left">
                                                {facility.title}
                                            </div>
                                            <p className="font-normal text-base sm:text-lg md:text-xl leading-relaxed text-black text-center sm:text-left">
                                                {facility.description}
                                            </p>
                                        </div>

                                        <div className=" flex justify-center sm:justify-start">
                                            <button
                                                className=" w-[141px] sm:w-[165px] h-[50px] sm:h-[54px] border border-[#005E77] text-[#005E77] text-[15px] sm:text-[16px] font-semibold rounded-[10px]
                             bg-transparent hover:bg-[#f3fef9] transition-all duration-300 active:scale-[0.98]"
                                            >
                                                Подробнее
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

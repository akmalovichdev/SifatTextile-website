"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Geography = () => {
    const { t } = useLanguage();
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [animationPhase, setAnimationPhase] = useState(0);

    // Регионы экспорта с координатами для подсветки
    const exportRegions = [
        { id: 'north-america', name: 'Северная Америка', color: '#0BBD83', countries: ['USA', 'Canada', 'Mexico'] },
        { id: 'cis-atr', name: 'СНГ и АТР', color: '#0BBD83', countries: ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan'] },
        { id: 'eu-uk', name: 'ЕС и Великобритания', color: '#0BBD83', countries: ['Germany', 'France', 'Italy', 'Spain', 'UK'] },
        { id: 'mena', name: 'MENA', color: '#0BBD83', countries: ['Saudi Arabia', 'UAE', 'Jordan', 'Lebanon'] },
        { id: 'china', name: 'Китай', color: '#0BBD83', countries: ['China'] },
        { id: 'iran', name: 'Иран', color: '#0BBD83', countries: ['Iran'] },
        { id: 'bangladesh', name: 'Бангладеш', color: '#0BBD83', countries: ['Bangladesh'] },
        { id: 'turkey', name: 'Турция', color: '#0BBD83', countries: ['Turkey'] },
        { id: 'russia', name: 'Россия', color: '#0BBD83', countries: ['Russia'] },
        { id: 'europe', name: 'Европа', color: '#0BBD83', countries: ['Poland', 'Czech Republic', 'Slovakia'] },
        { id: 'egypt', name: 'Египет', color: '#0BBD83', countries: ['Egypt'] }
    ];

    // Анимация подсветки
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <section id='Geography' className="bg-white py-16 sm:py-20 md:py-28 lg:py-36">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12">
                    <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 items-center text-center">
                        {/* Интерактивная карта */}
                        <div className="w-full max-w-[1660px] relative">
                            <div className="relative">
                                {/* Фоновая карта */}
                                <img
                                    src="/Geography/Geography_1.png"
                                    alt="World Map"
                                    className="w-full h-auto object-contain"
                                />

                                {/* Интерактивные зоны */}
                                <div className="absolute inset-0">
                                    {/* Северная Америка */}
                                    <div
                                        className="absolute top-[25%] left-[15%] w-[20%] h-[25%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[0].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 0 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[0])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* СНГ и АТР */}
                                    <div
                                        className="absolute top-[20%] left-[45%] w-[25%] h-[20%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[1].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 1 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[1])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* ЕС и Великобритания */}
                                    <div
                                        className="absolute top-[15%] left-[40%] w-[15%] h-[15%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[2].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 2 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[2])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* MENA */}
                                    <div
                                        className="absolute top-[35%] left-[50%] w-[20%] h-[15%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[3].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 0 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[3])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* Китай */}
                                    <div
                                        className="absolute top-[25%] left-[65%] w-[15%] h-[20%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[4].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 1 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[4])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* Иран */}
                                    <div
                                        className="absolute top-[30%] left-[52%] w-[8%] h-[10%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[5].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 2 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[5])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* Бангладеш */}
                                    <div
                                        className="absolute top-[40%] left-[65%] w-[6%] h-[8%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[6].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 0 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[6])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* Турция */}
                                    <div
                                        className="absolute top-[25%] left-[48%] w-[8%] h-[8%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[7].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 1 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[7])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* Россия */}
                                    <div
                                        className="absolute top-[15%] left-[50%] w-[25%] h-[15%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[8].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 2 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[8])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* Европа */}
                                    <div
                                        className="absolute top-[20%] left-[42%] w-[12%] h-[12%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[9].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 0 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[9])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />

                                    {/* Египет */}
                                    <div
                                        className="absolute top-[35%] left-[48%] w-[6%] h-[8%] cursor-pointer opacity-0 hover:opacity-30 transition-all duration-500"
                                        style={{
                                            background: `radial-gradient(circle, ${exportRegions[10].color}40 0%, transparent 70%)`,
                                            animation: animationPhase === 1 ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredRegion(exportRegions[10])}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />
                                </div>
                            </div>

                            {/* Информационная панель */}
                            {hoveredRegion && (
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-[300px] z-10">
                                    <h3 className="font-semibold text-lg text-[#005E77] mb-2">{hoveredRegion.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        Активный регион экспорта Siyob Group Textile
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: hoveredRegion.color }}
                                        />
                                        <span className="text-xs text-gray-500">Регион экспорта</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Легенда */}
                        <div className="w-full max-w-[800px] bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-[#005E77] mb-4">Регионы экспорта</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {exportRegions.map((region, index) => (
                                    <div
                                        key={region.id}
                                        className="flex items-center gap-2 p-2 rounded hover:bg-white transition-colors cursor-pointer"
                                        onMouseEnter={() => setHoveredRegion(region)}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: region.color }}
                                        />
                                        <span className="text-sm text-gray-700">{region.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Текст */}
                        <div className="w-full max-w-[1660px]">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-black leading-relaxed sm:leading-loose text-center sm:text-justify">
                                <span className="font-semibold">Siyob Group Textile</span> {t("geography.text")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CSS анимации */}
                <style jsx>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 0.3; transform: scale(1); }
                        50% { opacity: 0.6; transform: scale(1.05); }
                    }
                `}</style>
            </section>
        </div>
    )
}

export default Geography

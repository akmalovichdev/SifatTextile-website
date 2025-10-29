"use client";
import React, { useEffect, useState } from 'react';

const Loader = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [particles, setParticles] = useState([]);

    // Генерируем частицы только на клиенте
    useEffect(() => {
        const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10
        }));
        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        // Симулируем загрузку ресурсов
        const loadResources = async () => {
            // Получаем все изображения на странице
            const images = document.querySelectorAll('img');
            const totalImages = images.length || 1;
            let loadedImages = 0;

            // Функция для обновления прогресса
            const updateProgress = () => {
                loadedImages++;
                const newProgress = Math.min((loadedImages / totalImages) * 100, 100);
                setProgress(newProgress);

                if (loadedImages >= totalImages) {
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => {
                            onLoadComplete();
                        }, 500);
                    }, 300);
                }
            };

            // Если изображений нет, сразу завершаем
            if (totalImages === 0 || images.length === 0) {
                // Минимальная задержка для показа анимации
                setTimeout(() => {
                    setProgress(100);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => {
                            onLoadComplete();
                        }, 500);
                    }, 300);
                }, 1000);
                return;
            }

            // Отслеживаем загрузку каждого изображения
            images.forEach((img) => {
                if (img.complete) {
                    updateProgress();
                } else {
                    img.addEventListener('load', updateProgress);
                    img.addEventListener('error', updateProgress);
                }
            });

            // Таймаут на случай если изображения не загружаются
            setTimeout(() => {
                if (progress < 100) {
                    setProgress(100);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => {
                            onLoadComplete();
                        }, 500);
                    }, 300);
                }
            }, 5000);
        };

        // Небольшая задержка перед началом загрузки
        setTimeout(() => {
            loadResources();
        }, 100);
    }, [onLoadComplete, progress]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ${
                isComplete ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
            }`}
            style={{
                background: 'linear-gradient(135deg, #0BBD83 0%, #005E77 100%)'
            }}
        >
            {/* Анимированный фон с кругами */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                {/* Плавающие частицы */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative flex flex-col items-center justify-center gap-8 px-4">
                {/* Логотип с анимацией */}
                <div className="relative animate-[fadeIn_0.6s_ease-out]">
                    <div className="absolute -inset-8 bg-white/30 rounded-3xl blur-[40px] animate-pulse"></div>
                    <div className="relative p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300">
                        <img
                            src="/Logo/Logo_white.png"
                            alt="Siyob Group Logo"
                            className="w-[300px] sm:w-[380px] md:w-[450px] lg:w-[500px] h-[96px] sm:h-[122px] md:h-[144px] lg:h-[160px] object-contain"
                            style={{
                                filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))'
                            }}
                        />
                    </div>
                </div>

                {/* Анимированный спиннер */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 animate-[fadeIn_0.8s_ease-out_0.2s_both]">
                    {/* Вращающееся внешнее кольцо */}
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>

                    {/* Фоновое кольцо */}
                    <div className="absolute inset-2 border-4 border-white/20 rounded-full"></div>

                    {/* Анимированное кольцо прогресса */}
                    <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="white"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * progress) / 100}
                            className="transition-all duration-500 ease-out drop-shadow-lg"
                            style={{
                                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))'
                            }}
                        />
                    </svg>

                    {/* Центральный круг с процентом */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                            <span className="text-white text-2xl sm:text-3xl font-bold drop-shadow-lg">
                                {Math.round(progress)}%
                            </span>
                        </div>
                    </div>

                    {/* Вращающиеся точки */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 shadow-lg"></div>
                    </div>
                </div>

                {/* Текст загрузки */}
                <div className="text-center animate-[fadeIn_1s_ease-out_0.4s_both]">
                    <p className="text-white text-lg sm:text-xl font-semibold mb-3 drop-shadow-lg">
                        Загрузка контента
                    </p>
                    <div className="flex gap-1.5 justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce shadow-lg" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce shadow-lg" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>

                {/* Прогресс бар */}
                <div className="w-64 sm:w-80 h-2 bg-white/20 rounded-full overflow-hidden animate-[fadeIn_1.2s_ease-out_0.6s_both]">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-lg"
                        style={{
                            width: `${progress}%`,
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
                        }}
                    ></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loader;


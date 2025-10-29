"use client";
import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const LoaderWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Предзагрузка критических изображений
        const preloadImages = () => {
            const imageUrls = [
                '/Logo/Logo_white.png',
                '/Background/Background_1.png',
                '/AboutUs/AboutUs_1.png',
                '/AboutUs/AboutUs_2.png',
                '/WhyUs/WhyUs_1.png',
                '/News/News_1.jpg',
                '/News/News_2.jpg',
                '/News/News_3.jpg',
            ];

            const promises = imageUrls.map((url) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = resolve; // Продолжаем даже если изображение не загрузилось
                    img.src = url;
                });
            });

            Promise.all(promises).then(() => {
                // Минимальное время показа загрузчика (для красоты анимации)
                setTimeout(() => {
                    setShowContent(true);
                }, 800);
            });
        };

        // Начинаем предзагрузку
        preloadImages();

        // Максимальное время загрузки - 8 секунд
        const maxTimeout = setTimeout(() => {
            setShowContent(true);
        }, 8000);

        return () => clearTimeout(maxTimeout);
    }, []);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loader onLoadComplete={handleLoadComplete} />}
            <div className={`${showContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
                {children}
            </div>
        </>
    );
};

export default LoaderWrapper;


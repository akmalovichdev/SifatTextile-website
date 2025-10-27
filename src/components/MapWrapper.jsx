"use client";
import dynamic from 'next/dynamic';

// Динамический импорт карты без SSR
const InteractiveLeafletMap = dynamic(
    () => import('./InteractiveLeafletMapClient'),
    { 
        ssr: false,
        loading: () => (
            <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg mb-8 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0BBD83] mx-auto mb-4"></div>
                    <p className="text-gray-600">Загрузка карты...</p>
                </div>
            </div>
        )
    }
);

export default InteractiveLeafletMap;

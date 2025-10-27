"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Компонент для центрирования карты
function MapCenter({ center, zoom }) {
    const map = useMap();
    
    useEffect(() => {
        if (center && zoom) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    
    return null;
}

const InteractiveLeafletMapClient = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [mapCenter, setMapCenter] = useState([35.0, 60.0]);
    const [mapZoom, setMapZoom] = useState(3);
    const [countriesData, setCountriesData] = useState(null);

    // Регионы и страны экспорта с детальной информацией
    const exportCountries = [
        // Северная Америка
        { 
            id: 'USA',
            altIds: ['United States', 'USA', 'United States of America', 'США', 'Соединённые Штаты'],
            name: 'Северная Америка (США)', 
            color: '#0BBD83', 
            position: [37.0, -95.0],
            percentage: '15%, 25%',
            description: 'Соединённые Штаты Америки'
        },
        { 
            id: 'CAN',
            altIds: ['Canada', 'Канада'],
            name: 'Северная Америка (Канада)', 
            color: '#0BBD83', 
            position: [56.0, -106.0],
            percentage: '15%, 25%',
            description: 'Канада'
        },
        { 
            id: 'MEX',
            altIds: ['Mexico', 'Мексика'],
            name: 'Северная Америка (Мексика)', 
            color: '#0BBD83', 
            position: [23.0, -102.0],
            percentage: '15%, 25%',
            description: 'Мексика'
        },
        
        // СНГ и АТР
        { 
            id: 'KAZ',
            altIds: ['Kazakhstan', 'Казахстан'],
            name: 'СНГ и АТР (Казахстан)', 
            color: '#0BBD83', 
            position: [48.0, 66.0],
            percentage: '45%, 20%',
            description: 'Республика Казахстан'
        },
        { 
            id: 'UZB',
            altIds: ['Uzbekistan', 'Узбекистан'],
            name: 'СНГ и АТР (Узбекистан)', 
            color: '#0BBD83', 
            position: [41.0, 64.0],
            percentage: '45%, 20%',
            description: 'Республика Узбекистан'
        },
        { 
            id: 'KGZ',
            altIds: ['Kyrgyzstan', 'Кыргызстан'],
            name: 'СНГ и АТР (Кыргызстан)', 
            color: '#0BBD83', 
            position: [41.5, 74.5],
            percentage: '45%, 20%',
            description: 'Кыргызская Республика'
        },
        { 
            id: 'TJK',
            altIds: ['Tajikistan', 'Таджикистан'],
            name: 'СНГ и АТР (Таджикистан)', 
            color: '#0BBD83', 
            position: [38.5, 71.5],
            percentage: '45%, 20%',
            description: 'Республика Таджикистан'
        },
        
        // ЕС и Великобритания
        { 
            id: 'DEU',
            altIds: ['Germany', 'Германия'],
            name: 'ЕС (Германия)', 
            color: '#0BBD83', 
            position: [51.0, 10.0],
            percentage: '40%, 15%',
            description: 'Федеративная Республика Германия'
        },
        { 
            id: 'FRA',
            altIds: ['France', 'Франция'],
            name: 'ЕС (Франция)', 
            color: '#0BBD83', 
            position: [46.0, 2.0],
            percentage: '40%, 15%',
            description: 'Французская Республика'
        },
        { 
            id: 'ITA',
            altIds: ['Italy', 'Италия'],
            name: 'ЕС (Италия)', 
            color: '#0BBD83', 
            position: [43.0, 12.0],
            percentage: '40%, 15%',
            description: 'Итальянская Республика'
        },
        { 
            id: 'ESP',
            altIds: ['Spain', 'Испания'],
            name: 'ЕС (Испания)', 
            color: '#0BBD83', 
            position: [40.0, -4.0],
            percentage: '40%, 15%',
            description: 'Королевство Испания'
        },
        { 
            id: 'GBR',
            altIds: ['United Kingdom', 'Great Britain', 'UK', 'Великобритания', 'Соединённое Королевство'],
            name: 'Великобритания', 
            color: '#0BBD83', 
            position: [54.0, -2.0],
            percentage: '40%, 15%',
            description: 'Соединённое Королевство Великобритании'
        },
        
        // MENA
        { 
            id: 'SAU',
            altIds: ['Saudi Arabia', 'Саудовская Аравия'],
            name: 'MENA (Саудовская Аравия)', 
            color: '#0BBD83', 
            position: [24.0, 45.0],
            percentage: '50%, 35%',
            description: 'Королевство Саудовская Аравия'
        },
        { 
            id: 'ARE',
            altIds: ['United Arab Emirates', 'UAE', 'ОАЭ', 'Объединённые Арабские Эмираты'],
            name: 'MENA (ОАЭ)', 
            color: '#0BBD83', 
            position: [24.0, 54.0],
            percentage: '50%, 35%',
            description: 'Объединённые Арабские Эмираты'
        },
        { 
            id: 'JOR',
            altIds: ['Jordan', 'Иордания'],
            name: 'MENA (Иордания)', 
            color: '#0BBD83', 
            position: [31.0, 36.0],
            percentage: '50%, 35%',
            description: 'Иорданское Хашимитское Королевство'
        },
        { 
            id: 'LBN',
            altIds: ['Lebanon', 'Ливан'],
            name: 'MENA (Ливан)', 
            color: '#0BBD83', 
            position: [34.0, 36.0],
            percentage: '50%, 35%',
            description: 'Ливанская Республика'
        },
        
        // Китай
        { 
            id: 'CHN',
            altIds: ['China', 'Китай'],
            name: 'Китай', 
            color: '#0BBD83', 
            position: [35.0, 105.0],
            percentage: '65%, 25%',
            description: 'Китайская Народная Республика'
        },
        
        // Иран
        { 
            id: 'IRN',
            altIds: ['Iran', 'Иран'],
            name: 'Иран', 
            color: '#0BBD83', 
            position: [32.0, 53.0],
            percentage: '52%, 30%',
            description: 'Исламская Республика Иран'
        },
        
        // Бангладеш
        { 
            id: 'BGD',
            altIds: ['Bangladesh', 'Бангладеш'],
            name: 'Бангладеш', 
            color: '#0BBD83', 
            position: [24.0, 90.0],
            percentage: '65%, 40%',
            description: 'Народная Республика Бангладеш'
        },
        
        // Турция
        { 
            id: 'TUR',
            altIds: ['Turkey', 'Турция'],
            name: 'Турция', 
            color: '#0BBD83', 
            position: [39.0, 35.0],
            percentage: '48%, 25%',
            description: 'Турецкая Республика'
        },
        
        // Россия
        { 
            id: 'RUS',
            altIds: ['Russia', 'Russian Federation', 'Россия', 'Российская Федерация'],
            name: 'Россия', 
            color: '#0BBD83', 
            position: [60.0, 100.0],
            percentage: '50%, 15%',
            description: 'Российская Федерация'
        },
        
        // Европа (Восточная)
        { 
            id: 'POL',
            altIds: ['Poland', 'Польша'],
            name: 'Европа (Польша)', 
            color: '#0BBD83', 
            position: [52.0, 20.0],
            percentage: '42%, 20%',
            description: 'Республика Польша'
        },
        { 
            id: 'CZE',
            altIds: ['Czech Republic', 'Czechia', 'Чехия'],
            name: 'Европа (Чехия)', 
            color: '#0BBD83', 
            position: [49.8, 15.5],
            percentage: '42%, 20%',
            description: 'Чешская Республика'
        },
        { 
            id: 'SVK',
            altIds: ['Slovakia', 'Словакия'],
            name: 'Европа (Словакия)', 
            color: '#0BBD83', 
            position: [48.7, 19.7],
            percentage: '42%, 20%',
            description: 'Словацкая Республика'
        },
        
        // Египет
        { 
            id: 'EGY',
            altIds: ['Egypt', 'Египет'],
            name: 'Египет', 
            color: '#0BBD83', 
            position: [26.0, 30.0],
            percentage: '48%, 35%',
            description: 'Арабская Республика Египет'
        }
    ];

    // Загружаем данные о границах стран
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
            .then(response => response.json())
            .then(data => {
                console.log('Загружены данные стран');
                if (data.features && data.features.length > 0) {
                    console.log('Пример свойств страны:', data.features[0].properties);
                    console.log('Всего стран:', data.features.length);
                }
                setCountriesData(data);
            })
            .catch(error => {
                console.error('Ошибка загрузки данных стран:', error);
            });
    }, []);

    const handleRegionClick = (country) => {
        setMapCenter(country.position);
        setMapZoom(5);
        setSelectedRegion(country);
    };

    // Функция для определения стиля каждой страны
    const countryStyle = (feature) => {
        if (!feature || !feature.properties) {
            return {
                fillColor: '#e0e0e0',
                fillOpacity: 0.2,
                color: '#cccccc',
                weight: 1,
                opacity: 0.5
            };
        }
        
        const props = feature.properties;
        const countryCode = props.ISO_A3 || props.iso_a3 || props.adm0_a3;
        const countryName = props.ADMIN || props.NAME || props.name || props.admin || '';
        
        // Поиск по коду или названию
        const isExportCountry = exportCountries.find(c => 
            c.id === countryCode || 
            c.altIds?.some(altId => 
                countryName.toLowerCase().includes(altId.toLowerCase()) ||
                altId.toLowerCase().includes(countryName.toLowerCase())
            )
        );
        
        if (isExportCountry) {
            return {
                fillColor: isExportCountry.color,
                fillOpacity: 0.5,
                color: isExportCountry.color,
                weight: 3,
                opacity: 1
            };
        }
        
        return {
            fillColor: '#e0e0e0',
            fillOpacity: 0.2,
            color: '#cccccc',
            weight: 1,
            opacity: 0.5
        };
    };

    // Обработчики событий для каждой страны
    const onEachCountry = (feature, layer) => {
        if (!feature || !feature.properties) return;
        
        const props = feature.properties;
        const countryCode = props.ISO_A3 || props.iso_a3 || props.adm0_a3;
        const countryName = props.ADMIN || props.NAME || props.name || props.admin || '';
        
        // Поиск по коду или названию
        const exportCountry = exportCountries.find(c => 
            c.id === countryCode || 
            c.altIds?.some(altId => 
                countryName.toLowerCase().includes(altId.toLowerCase()) ||
                altId.toLowerCase().includes(countryName.toLowerCase())
            )
        );
        
        if (exportCountry) {
            layer.on({
                mouseover: (e) => {
                    e.target.setStyle({
                        fillOpacity: 0.7,
                        weight: 3
                    });
                },
                mouseout: (e) => {
                    e.target.setStyle({
                        fillOpacity: 0.4,
                        weight: 2
                    });
                },
                click: () => {
                    setSelectedRegion(exportCountry);
                    setMapCenter(exportCountry.position);
                    setMapZoom(5);
                }
            });

            // Добавляем всплывающее окно
            layer.bindPopup(`
                <div style="padding: 15px; font-family: Arial, sans-serif; min-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; color: #005E77; font-size: 18px; font-weight: bold;">
                        ${exportCountry.name}
                    </h3>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; font-style: italic;">
                        ${exportCountry.description}
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                        Активный регион экспорта Siyob Group Textile
                    </p>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                        <div style="width: 12px; height: 12px; background-color: ${exportCountry.color}; border-radius: 50%;"></div>
                        <span style="font-size: 12px; color: #888;">
                            Позиция: ${exportCountry.percentage}
                        </span>
                    </div>
                </div>
            `);

            // Добавляем подсказку
            layer.bindTooltip(exportCountry.name, {
                permanent: false,
                direction: 'center',
                className: 'country-tooltip'
            });
        }
    };

    return (
        <div className="w-full">
            {/* Карта Leaflet */}
            <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg mb-8">
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <MapCenter center={mapCenter} zoom={mapZoom} />
                    
                    {/* Серые тайлы карты */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* GeoJSON с границами стран */}
                    {countriesData && (
                        <GeoJSON
                            data={countriesData}
                            style={countryStyle}
                            onEachFeature={onEachCountry}
                        />
                    )}
                </MapContainer>
            </div>

            {/* Интерактивный список стран */}
            <div className="w-full max-w-[900px] mx-auto bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#005E77] mb-4">Страны экспорта</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Нажмите на страну в списке или на карте, чтобы посмотреть детали
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {exportCountries.map((country) => (
                        <div
                            key={country.id}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                                selectedRegion?.id === country.id 
                                    ? 'bg-white shadow-md border-2 border-[#0BBD83]' 
                                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                            }`}
                            onClick={() => handleRegionClick(country)}
                        >
                            <div
                                className="w-4 h-4 rounded-full flex-shrink-0"
                                style={{ backgroundColor: country.color }}
                            />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-700 block">
                                    {country.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {country.percentage}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Информация о выбранной стране */}
                {selectedRegion && (
                    <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="font-semibold text-[#005E77] mb-3 text-lg">
                            {selectedRegion.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 italic">
                            {selectedRegion.description}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                            Активный регион экспорта Siyob Group Textile
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: selectedRegion.color }}
                            />
                            <span className="text-xs text-gray-500">
                                Позиция на карте: {selectedRegion.percentage}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS для стилизации подсказок */}
            <style jsx global>{`
                .country-tooltip {
                    background-color: white;
                    border: 2px solid #0BBD83;
                    border-radius: 4px;
                    padding: 5px 10px;
                    font-weight: bold;
                    color: #005E77;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .leaflet-tooltip-top:before,
                .leaflet-tooltip-bottom:before,
                .leaflet-tooltip-left:before,
                .leaflet-tooltip-right:before {
                    border-top-color: #0BBD83;
                }
            `}</style>
        </div>
    );
};

export default InteractiveLeafletMapClient;

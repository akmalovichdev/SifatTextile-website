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
    const [isMobile, setIsMobile] = useState(false);

    // Определяем, мобильное ли устройство
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Устанавливаем начальный зум в зависимости от размера экрана
            if (mobile && mapZoom === 3) {
                setMapZoom(2);
            } else if (!mobile && mapZoom === 2) {
                setMapZoom(3);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, [mapZoom]);

    // Страны экспорта
    const exportCountries = [
        // Узбекистан - главный поставщик
        {
            id: 'UZB',
            altIds: ['Uzbekistan', 'Узбекистан'],
            name: 'Узбекистан',
            color: '#808080',
            position: [41.3, 64.5],
            percentage: '',
            description: 'Главный поставщик - Республика Узбекистан',
            isMainSupplier: true
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
        setMapZoom(isMobile ? 4 : 5);
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
                <div style="padding: 12px; font-family: Arial, sans-serif; min-width: 200px; max-width: 280px;">
                    <h3 style="margin: 0 0 8px 0; color: #005E77; font-size: 16px; font-weight: bold; line-height: 1.3;">
                        ${exportCountry.name}
                        ${exportCountry.isMainSupplier ? '<span style="color: #808080; font-size: 14px; margin-left: 6px;">★</span>' : ''}
                    </h3>
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; font-style: italic; line-height: 1.4;">
                        ${exportCountry.description}
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">
                        ${exportCountry.isMainSupplier ? 'Главный поставщик' : 'Активный регион экспорта Siyob Group Textile'}
                    </p>
                </div>
            `, {
                maxWidth: 280,
                minWidth: isMobile ? 200 : 250
            });

            // Добавляем подсказку (только для десктопа)
            if (!isMobile) {
                layer.bindTooltip(exportCountry.name, {
                    permanent: false,
                    direction: 'center',
                    className: 'country-tooltip'
                });
            }
        }
    };

    return (
        <div className="w-full relative z-10">
            {/* Карта Leaflet */}
            <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg mb-4 sm:mb-6 md:mb-8 relative z-10">
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%', position: 'relative', zIndex: 10 }}
                    scrollWheelZoom={!isMobile}
                    dragging={true}
                    touchZoom={true}
                    zoomControl={!isMobile}
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
            <div className="w-full max-w-[900px] mx-auto bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#005E77] mb-3 sm:mb-4">Страны экспорта</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    Нажмите на страну {isMobile ? 'в списке' : 'в списке или на карте'}, чтобы посмотреть детали
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {exportCountries.map((country) => (
                        <div
                            key={country.id}
                            className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer active:scale-95 ${
                                selectedRegion?.id === country.id
                                    ? 'bg-white shadow-md border-2 border-[#0BBD83]'
                                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                            }`}
                            onClick={() => handleRegionClick(country)}
                        >
                            <div
                                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                                style={{ backgroundColor: country.color }}
                            />
                            <div className="flex-1 min-w-0">
                                <span className="text-xs sm:text-sm font-medium text-gray-700 block truncate">
                                    {country.name}
                                    {country.isMainSupplier && (
                                        <span className="ml-1 sm:ml-2 text-gray-500">★</span>
                                    )}
                                </span>
                                {country.isMainSupplier && (
                                    <span className="text-[10px] sm:text-xs text-gray-500 italic block">
                                        Главный поставщик
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Информация о выбранной стране */}
                {selectedRegion && (
                    <div className="mt-4 sm:mt-5 md:mt-6 p-4 sm:p-5 md:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="font-semibold text-[#005E77] mb-2 sm:mb-3 text-base sm:text-lg">
                            {selectedRegion.name}
                            {selectedRegion.isMainSupplier && (
                                <span className="ml-2 text-gray-500">★</span>
                            )}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 italic">
                            {selectedRegion.description}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                            {selectedRegion.isMainSupplier ? 'Главный поставщик' : 'Активный регион экспорта Siyob Group Textile'}
                        </p>
                    </div>
                )}
            </div>

            {/* CSS для стилизации подсказок */}
            <style jsx global>{`
                .country-tooltip {
                    background-color: white;
                    border: 2px solid #0BBD83;
                    border-radius: 4px;
                    padding: 4px 8px;
                    font-weight: bold;
                    color: #005E77;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    font-size: 12px;
                }

                @media (min-width: 640px) {
                    .country-tooltip {
                        padding: 5px 10px;
                        font-size: 14px;
                    }
                }

                .leaflet-tooltip-top:before,
                .leaflet-tooltip-bottom:before,
                .leaflet-tooltip-left:before,
                .leaflet-tooltip-right:before {
                    border-top-color: #0BBD83;
                }

                /* Улучшаем контролы карты на мобильных */
                .leaflet-control-zoom {
                    display: none !important;
                }

                @media (min-width: 768px) {
                    .leaflet-control-zoom {
                        display: block !important;
                    }
                }

                /* Оптимизация всплывающих окон на мобильных */
                .leaflet-popup-content-wrapper {
                    border-radius: 8px;
                }

                .leaflet-popup-content {
                    margin: 0 !important;
                }

                @media (max-width: 640px) {
                    .leaflet-popup-content-wrapper {
                        max-width: calc(100vw - 60px) !important;
                    }
                }

                /* Улучшение touch-взаимодействия */
                .leaflet-container {
                    font-family: Arial, sans-serif;
                }

                .leaflet-touch .leaflet-bar {
                    border: 2px solid rgba(0,0,0,0.2);
                }

                /* Фиксируем z-index для элементов карты */
                .leaflet-pane {
                    z-index: 10 !important;
                }

                .leaflet-control-container {
                    z-index: 100 !important;
                }

                .leaflet-popup-pane {
                    z-index: 200 !important;
                }

                .leaflet-tooltip-pane {
                    z-index: 150 !important;
                }

                /* Убеждаемся что все элементы карты ниже header (z-index: 9998) */
                .leaflet-top,
                .leaflet-bottom {
                    z-index: 100 !important;
                }
            `}</style>
        </div>
    );
};

export default InteractiveLeafletMapClient;

"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Исправляем иконки маркеров для Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
            color: '#005E77', // Фирменный синий цвет
            position: [41.3, 64.5],
            tons: null,
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
            tons: 11484,
            percentage: '26,13%',
            description: 'Китайская Народная Республика'
        },

        // Турция
        {
            id: 'TUR',
            altIds: ['Turkey', 'Турция', 'Typumg'],
            name: 'Турция',
            color: '#0BBD83',
            position: [39.0, 35.0],
            tons: 19275,
            percentage: '43,86%',
            description: 'Турецкая Республика'
        },

        // Польша
        {
            id: 'POL',
            altIds: ['Poland', 'Польша'],
            name: 'Польша',
            color: '#0BBD83',
            position: [52.0, 20.0],
            tons: 2198,
            percentage: '5,00%',
            description: 'Республика Польша'
        },

        // Германия
        {
            id: 'DEU',
            altIds: ['Germany', 'Германия', 'Гурмания'],
            name: 'Германия',
            color: '#0BBD83',
            position: [51.0, 10.0],
            tons: 2198,
            percentage: '5,00%',
            description: 'Федеративная Республика Германия'
        },

        // Иран
        {
            id: 'IRN',
            altIds: ['Iran', 'Иран'],
            name: 'Иран',
            color: '#0BBD83',
            position: [32.0, 53.0],
            tons: 2565,
            percentage: '5,84%',
            description: 'Исламская Республика Иран'
        },

        // Армения
        {
            id: 'ARM',
            altIds: ['Armenia', 'Армения'],
            name: 'Армения',
            color: '#0BBD83',
            position: [40.0, 45.0],
            tons: 1465,
            percentage: '3,33%',
            description: 'Республика Армения'
        },

        // Россия
        {
            id: 'RUS',
            altIds: ['Russia', 'Russian Federation', 'Россия', 'Российская Федерация'],
            name: 'Россия',
            color: '#0BBD83',
            position: [60.0, 100.0],
            tons: 3167,
            percentage: '7,21%',
            description: 'Российская Федерация'
        },

        // Бангладеш
        {
            id: 'BGD',
            altIds: ['Bangladesh', 'Бангладеш'],
            name: 'Бангладеш',
            color: '#0BBD83',
            position: [24.0, 90.0],
            tons: 1098,
            percentage: '2,50%',
            description: 'Народная Республика Бангладеш'
        },

        // Египет
        {
            id: 'EGY',
            altIds: ['Egypt', 'Египет'],
            name: 'Египет',
            color: '#0BBD83',
            position: [26.0, 30.0],
            tons: 495,
            percentage: '1,13%',
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
            const tonsDisplay = exportCountry.tons ? `${exportCountry.tons.toLocaleString('ru-RU')} тонн` : '';
            const percentageDisplay = exportCountry.percentage ? exportCountry.percentage : '';

            layer.bindPopup(`
                <div style="padding: 12px; font-family: Arial, sans-serif; min-width: 200px; max-width: 280px;">
                    <h3 style="margin: 0 0 8px 0; color: #005E77; font-size: 16px; font-weight: bold; line-height: 1.3;">
                        ${exportCountry.name}
                        ${exportCountry.isMainSupplier ? '<span style="color: #808080; font-size: 14px; margin-left: 6px;">★</span>' : ''}
                    </h3>
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; font-style: italic; line-height: 1.4;">
                        ${exportCountry.description}
                    </p>
                    ${tonsDisplay || percentageDisplay ? `
                        <div style="margin: 8px 0; padding: 8px; background-color: #f5f5f5; border-radius: 4px;">
                            ${tonsDisplay ? `<p style="margin: 0 0 4px 0; font-size: 13px; color: #005E77; font-weight: 600; line-height: 1.4;">
                                Количество: ${tonsDisplay}
                            </p>` : ''}
                            ${percentageDisplay ? `<p style="margin: 0; font-size: 13px; color: #005E77; font-weight: 600; line-height: 1.4;">
                                % в общем экспорте: ${percentageDisplay}
                            </p>` : ''}
                        </div>
                    ` : ''}
                    <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">
                        ${exportCountry.isMainSupplier ? 'Главный поставщик' : 'Активный регион экспорта <span style="color: #005E77; font-weight: 600;">Sifat Textile</span>'}
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

                    {/* Маркер завода Pure Milk */}
                    <Marker position={[41.3, 69.3]}>
                        <Popup>
                            <div style={{ padding: '12px', fontFamily: 'Arial, sans-serif', minWidth: '200px' }}>
                                <h3 style={{ margin: '0 0 8px 0', color: '#005E77', fontSize: '16px', fontWeight: 'bold' }}>
                                    Завод Pure Milk
                                </h3>
                                <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#666' }}>
                                    Тайлякский район, населённый пункт Кургонча
                                </p>
                                <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                                    Тел: +99890 657 05 02<br />
                                    +998 97 390 38 00
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            {/* Интерактивный список стран */}
            <div className="w-full max-w-[900px] mx-auto bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#005E77] mb-3 sm:mb-4">Страны экспорта</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    Нажмите на страну {isMobile ? 'в списке' : 'в списке или на карте'}, чтобы посмотреть детали
                </p>

                {/* Таблица стран экспорта */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#005E77] text-white">
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border border-gray-300">Страна экспорта</th>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold border border-gray-300">Количество, Тонн</th>
                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold border border-gray-300">в общем экспорте</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exportCountries
                                .filter(country => !country.isMainSupplier && country.tons)
                                .sort((a, b) => b.tons - a.tons)
                                .map((country) => (
                                <tr
                                    key={country.id}
                                    className={`cursor-pointer transition-all duration-200 ${
                                        selectedRegion?.id === country.id
                                            ? 'bg-[#0BBD83]/20 border-2 border-[#0BBD83]'
                                            : 'hover:bg-white hover:shadow-sm'
                                    }`}
                                    onClick={() => handleRegionClick(country)}
                                >
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 border border-gray-300">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: country.color }}
                                            />
                                            {country.name}
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right text-gray-700 border border-gray-300">
                                        {country.tons.toLocaleString('ru-RU')}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right text-[#005E77] font-semibold border border-gray-300">
                                        {country.percentage}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        {(selectedRegion.tons || selectedRegion.percentage) && (
                            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                {selectedRegion.tons && (
                                    <p className="text-sm sm:text-base text-[#005E77] font-semibold mb-1">
                                        Количество: {selectedRegion.tons.toLocaleString('ru-RU')} тонн
                                    </p>
                                )}
                                {selectedRegion.percentage && (
                                    <p className="text-sm sm:text-base text-[#005E77] font-semibold">
                                        % в общем экспорте: {selectedRegion.percentage}
                                    </p>
                                )}
                            </div>
                        )}
                        <p className="text-xs sm:text-sm text-gray-600">
                            {selectedRegion.isMainSupplier ? 'Главный поставщик' : (
                                <>
                                    Активный регион экспорта <span className="font-semibold text-[#005E77]">Sifat Textile</span>
                                </>
                            )}
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

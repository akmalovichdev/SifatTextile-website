"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import StudioEditorWrapper from "@/components/StudioEditor";

const AdminPanel = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(false);
  const [studioProject, setStudioProject] = useState(null);

  useEffect(() => {
    // Проверка авторизации
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [contentRes, vacanciesRes, newsRes, studioRes] = await Promise.all([
        fetch("/api/admin/content"),
        fetch("/api/vacancies"),
        fetch("/api/news"),
        fetch("/api/admin/studio")
      ]);

      const contentData = await contentRes.json();
      const vacanciesData = await vacanciesRes.json();
      const newsData = await newsRes.json();
      const studioData = await studioRes.json();

      // Инициализация данных, если их нет
      const initializedContent = {
        ourProductions: contentData.ourProductions || {
          surxon: "/OurProductions/OurProductions_1.png",
          maroqand: "/OurProductions/OurProductions_2.png",
          kamalak: "/OurProductions/OurProductions_3.png"
        },
        aboutUs: contentData.aboutUs || {
          image1: "/AboutUs/AboutUs_1.png",
          image2: "/AboutUs/AboutUs_2.png",
          image3: "/AboutUs/AboutUs_3.png",
          image4: "/AboutUs/AboutUs_4.png"
        },
        gallery: contentData.gallery || [
          "/Gallery/Gallery_1.png",
          "/Gallery/Gallery_2.png",
          "/Gallery/Gallery_3.png",
          "/Gallery/Gallery_4.png",
          "/Gallery/Gallery_5.png",
          "/Gallery/Gallery_6.png",
          "/Gallery/Gallery_7.png"
        ],
        hero: contentData.hero || {
          background: "/Background/Background_1.png"
        },
        products: contentData.products || [],
        whyUs: contentData.whyUs || { video: "/WhyUs/WhyUs_1.png" },
        ourServises: contentData.ourServises || { video: "/OurServises/OurServises_1.png" },
        surxon: contentData.surxon || { videos: [] },
        maroqand: contentData.maroqand || { videos: [] },
        kamalak: contentData.kamalak || { videos: [] },
        ...contentData
      };

      setContent(initializedContent);
      setVacancies(vacanciesData || []);
      setNews(newsData || []);
      setStudioProject(studioData || null);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("adminToken", "admin-token");
        setIsAuthenticated(true);
        loadData();
      } else {
        alert("Неверный пароль");
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      alert("Ошибка входа");
    }
  };

  const handleSaveContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      // Создаем копию контента без news, так как новости управляются отдельно
      const { news: _, ...contentWithoutNews } = content;

      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(contentWithoutNews),
      });

      if (response.ok) {
        alert("Контент успешно сохранен!");
      } else {
        alert("Ошибка сохранения контента");
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  };

  const handleAddVacancy = () => {
    setVacancies([
      ...vacancies,
      {
        id: null,
        title: "",
        description: "",
        link: "",
        active: true,
      },
    ]);
  };

  const handleAddNews = () => {
    setNews([
      ...news,
      {
        id: null,
        title: "",
        subtitle: "",
        image: "",
        content: "",
        fullText: "",
      },
    ]);
  };

  const handleSaveNews = async (newsItem) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newsItem),
      });

      if (response.ok) {
        alert("Новость успешно сохранена!");
        loadData();
      } else {
        alert("Ошибка сохранения новости");
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!confirm("Удалить новость?")) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/news?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Новость удалена!");
        loadData();
      } else {
        alert("Ошибка удаления");
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Ошибка удаления");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVacancy = async (vacancy) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/vacancies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(vacancy),
      });

      if (response.ok) {
        alert("Вакансия успешно сохранена!");
        loadData();
      } else {
        alert("Ошибка сохранения вакансии");
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVacancy = async (id) => {
    if (!confirm("Удалить вакансию?")) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/vacancies?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Вакансия удалена!");
        loadData();
      } else {
        alert("Ошибка удаления");
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Ошибка удаления");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#005E77] mb-6">Админ-панель</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#0BBD83] hover:bg-[#0aa775] text-white py-2 rounded-lg font-medium"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#005E77]">Админ-панель</h1>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                setIsAuthenticated(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Выйти
            </button>
          </div>

          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-4 py-2 font-medium ${
                activeTab === "content"
                  ? "border-b-2 border-[#0BBD83] text-[#0BBD83]"
                  : "text-gray-600"
              }`}
            >
              Контент (Фото/Видео)
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-4 py-2 font-medium ${
                activeTab === "news"
                  ? "border-b-2 border-[#0BBD83] text-[#0BBD83]"
                  : "text-gray-600"
              }`}
            >
              Новости
            </button>
            <button
              onClick={() => setActiveTab("vacancies")}
              className={`px-4 py-2 font-medium ${
                activeTab === "vacancies"
                  ? "border-b-2 border-[#0BBD83] text-[#0BBD83]"
                  : "text-gray-600"
              }`}
            >
              Вакансии
            </button>
            <button
              onClick={() => setActiveTab("studio")}
              className={`px-4 py-2 font-medium ${
                activeTab === "studio"
                  ? "border-b-2 border-[#0BBD83] text-[#0BBD83]"
                  : "text-gray-600"
              }`}
            >
              Визуальный редактор
            </button>
          </div>

          {loading && (
            <div className="text-center py-4">
              <p className="text-gray-600">Загрузка...</p>
            </div>
          )}

          {activeTab === "content" && content && (
            <div className="space-y-6">
              {/* Our Productions */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Our Productions (Наши производства)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["surxon", "maroqand", "kamalak"].map((factory) => (
                    <div key={factory}>
                      <ImageUploader
                        label={factory.charAt(0).toUpperCase() + factory.slice(1)}
                        value={content.ourProductions?.[factory] || ""}
                        onChange={(path) => {
                          setContent({
                            ...content,
                            ourProductions: {
                              ...content.ourProductions,
                              [factory]: path,
                            },
                          });
                        }}
                        folder="OurProductions"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* About Us */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">About Us (О нас)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["image1", "image2", "image3", "image4"].map((imgKey) => (
                    <div key={imgKey}>
                      <ImageUploader
                        label={`Изображение ${imgKey.replace('image', '')}`}
                        value={content.aboutUs?.[imgKey] || ""}
                        onChange={(path) => {
                          setContent({
                            ...content,
                            aboutUs: {
                              ...content.aboutUs,
                              [imgKey]: path,
                            },
                          });
                        }}
                        folder="AboutUs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Gallery (Галерея)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(content.gallery || Array(7).fill("")).map((img, index) => (
                    <div key={index}>
                      <ImageUploader
                        label={`Изображение ${index + 1}`}
                        value={img || ""}
                        onChange={(path) => {
                          const newGallery = [...(content.gallery || [])];
                          newGallery[index] = path;
                          while (newGallery.length < 7) newGallery.push("");
                          setContent({
                            ...content,
                            gallery: newGallery,
                          });
                        }}
                        folder="Gallery"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Background */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Hero (Главная страница)</h2>
                <div className="space-y-4">
                  <ImageUploader
                    label="Фоновое изображение"
                    value={content.hero?.background || ""}
                    onChange={(path) => {
                      setContent({
                        ...content,
                        hero: {
                          ...content.hero,
                          background: path,
                        },
                      });
                    }}
                    folder="Background"
                  />
                  <ImageUploader
                    label="Видео (если нужно видео вместо изображения)"
                    value={content.hero?.video || ""}
                    onChange={(path) => {
                      setContent({
                        ...content,
                        hero: {
                          ...content.hero,
                          video: path,
                        },
                      });
                    }}
                    folder="Background"
                    accept="image/*,video/*"
                  />
                </div>
              </div>

              {/* Products */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Products (Продукты)</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {(content.products || []).map((product, index) => (
                    <div key={product.id || index} className="p-4 border rounded space-y-3">
                      <div className="flex gap-2 items-center">
                        <label className="block text-sm font-medium w-20">ID:</label>
                        <span className="text-sm">{product.id}</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Изображение:</label>
                        <ImageUploader
                          value={product.img || ""}
                          onChange={(path) => {
                            const newProducts = [...(content.products || [])];
                            newProducts[index] = { ...newProducts[index], img: path };
                            setContent({
                              ...content,
                              products: newProducts,
                            });
                          }}
                          folder="OurProducts"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">Название:</label>
                        <input
                          type="text"
                          value={product.title || ""}
                          onChange={(e) => {
                            const newProducts = [...(content.products || [])];
                            newProducts[index] = { ...newProducts[index], title: e.target.value };
                            setContent({
                              ...content,
                              products: newProducts,
                            });
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Фабрики (Видео) */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Фабрики (Видео)</h2>
                {["surxon", "maroqand", "kamalak"].map((factory) => (
                  <div key={factory} className="mb-6 p-4 border rounded">
                    <h3 className="font-semibold mb-4 capitalize text-lg">{factory}</h3>
                    <div className="space-y-3">
                      {(content[factory]?.videos || Array(3).fill("")).map((video, index) => (
                        <div key={index}>
                          <ImageUploader
                            label={`Видео ${index + 1}`}
                            value={video || ""}
                            onChange={(path) => {
                              const videos = [...(content[factory]?.videos || [])];
                              videos[index] = path;
                              while (videos.length < 3) videos.push("");
                              setContent({
                                ...content,
                                [factory]: { ...content[factory], videos },
                              });
                            }}
                            folder={factory.charAt(0).toUpperCase() + factory.slice(1)}
                            accept="image/*,video/*"
                          />
                        </div>
                      ))}
                    </div>
                    {/* JSON редактор для продвинутых пользователей */}
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                        JSON редактор (для продвинутых)
                      </summary>
                      <textarea
                        value={JSON.stringify(content[factory]?.videos || [], null, 2)}
                        onChange={(e) => {
                          try {
                            const videos = JSON.parse(e.target.value);
                            setContent({
                              ...content,
                              [factory]: { ...content[factory], videos },
                            });
                          } catch (err) {
                            // Игнорируем ошибки парсинга во время ввода
                          }
                        }}
                        className="w-full h-24 p-2 border rounded font-mono text-xs mt-2"
                        placeholder='["/path/to/video1.png", "/path/to/video2.png"]'
                      />
                    </details>
                  </div>
                ))}
              </div>

              {/* Why Us & Our Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Why Us (Видео)</h2>
                  <ImageUploader
                    label="Видео"
                    value={content.whyUs?.video || ""}
                    onChange={(path) => {
                      setContent({
                        ...content,
                        whyUs: { ...content.whyUs, video: path },
                      });
                    }}
                    folder="WhyUs"
                    accept="image/*,video/*"
                  />
                </div>
                <div className="p-4 border rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Our Services (Видео)</h2>
                  <ImageUploader
                    label="Видео"
                    value={content.ourServises?.video || ""}
                    onChange={(path) => {
                      setContent({
                        ...content,
                        ourServises: { ...content.ourServises, video: path },
                      });
                    }}
                    folder="OurServises"
                    accept="image/*,video/*"
                  />
                </div>
              </div>

              {/* Другие медиа */}
              <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Другие медиа (JSON редактор)</h2>
                <textarea
                  value={JSON.stringify(content, null, 2)}
                  onChange={(e) => {
                    try {
                      setContent(JSON.parse(e.target.value));
                    } catch (err) {
                      // Игнорируем ошибки парсинга
                    }
                  }}
                  className="w-full h-96 p-4 border rounded font-mono text-sm"
                />
              </div>

              <button
                onClick={handleSaveContent}
                className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-6 py-2 rounded-lg font-medium"
              >
                Сохранить контент
              </button>
            </div>
          )}

          {activeTab === "news" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Новости</h2>
                <button
                  onClick={handleAddNews}
                  className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-4 py-2 rounded-lg"
                >
                  + Добавить новость
                </button>
              </div>

              {news.map((newsItem, index) => (
                <div key={newsItem.id || index} className="p-4 border rounded-lg space-y-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Заголовок:</label>
                    <input
                      type="text"
                      value={newsItem.title || ""}
                      onChange={(e) => {
                        const updated = [...news];
                        updated[index] = { ...updated[index], title: e.target.value };
                        setNews(updated);
                      }}
                      placeholder="Заголовок новости"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Изображение:</label>
                    <ImageUploader
                      value={newsItem.image || ""}
                      onChange={(path) => {
                        const updated = [...news];
                        updated[index] = { ...updated[index], image: path };
                        setNews(updated);
                      }}
                      folder="News"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Подзаголовок:</label>
                    <input
                      type="text"
                      value={newsItem.subtitle || ""}
                      onChange={(e) => {
                        const updated = [...news];
                        updated[index] = { ...updated[index], subtitle: e.target.value };
                        setNews(updated);
                      }}
                      placeholder="Подзаголовок"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Краткое содержание:</label>
                    <textarea
                      value={newsItem.content || ""}
                      onChange={(e) => {
                        const updated = [...news];
                        updated[index] = { ...updated[index], content: e.target.value };
                        setNews(updated);
                      }}
                      placeholder="Краткое содержание новости"
                      className="w-full px-3 py-2 border rounded h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Полный текст:</label>
                    <textarea
                      value={newsItem.fullText || ""}
                      onChange={(e) => {
                        const updated = [...news];
                        updated[index] = { ...updated[index], fullText: e.target.value };
                        setNews(updated);
                      }}
                      placeholder="Полный текст новости"
                      className="w-full px-3 py-2 border rounded h-32"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveNews(news[index])}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
                      >
                        Сохранить
                      </button>
                      {newsItem.id && (
                        <button
                          onClick={() => handleDeleteNews(newsItem.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "vacancies" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Вакансии</h2>
                <button
                  onClick={handleAddVacancy}
                  className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-4 py-2 rounded-lg"
                >
                  + Добавить вакансию
                </button>
              </div>

              {vacancies.map((vacancy, index) => (
                <div key={vacancy.id || index} className="p-4 border rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={vacancy.title || ""}
                      onChange={(e) => {
                        const updated = [...vacancies];
                        updated[index] = { ...updated[index], title: e.target.value };
                        setVacancies(updated);
                      }}
                      placeholder="Название вакансии"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <textarea
                      value={vacancy.description || ""}
                      onChange={(e) => {
                        const updated = [...vacancies];
                        updated[index] = { ...updated[index], description: e.target.value };
                        setVacancies(updated);
                      }}
                      placeholder="Описание"
                      className="w-full px-3 py-2 border rounded h-24"
                    />
                    <input
                      type="url"
                      value={vacancy.link || ""}
                      onChange={(e) => {
                        const updated = [...vacancies];
                        updated[index] = { ...updated[index], link: e.target.value };
                        setVacancies(updated);
                      }}
                      placeholder="Ссылка (URL)"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={vacancy.active !== false}
                          onChange={(e) => {
                            const updated = [...vacancies];
                            updated[index] = { ...updated[index], active: e.target.checked };
                            setVacancies(updated);
                          }}
                        />
                        <span>Активна</span>
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveVacancy(vacancies[index])}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
                        >
                          Сохранить
                        </button>
                        {vacancy.id && (
                          <button
                            onClick={() => handleDeleteVacancy(vacancy.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                          >
                            Удалить
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "studio" && (
            <div className="w-full">
              <StudioEditorWrapper
                onSave={async (data) => {
                  try {
                    setLoading(true);
                    const token = localStorage.getItem("adminToken");

                    // Сохраняем проект в localStorage и на сервер
                    localStorage.setItem('studioProject', JSON.stringify(data));

                    const response = await fetch("/api/admin/studio", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                      },
                      body: JSON.stringify(data),
                    });

                    if (response.ok) {
                      alert("Проект успешно сохранен!");
                      setStudioProject(data);
                    } else {
                      alert("Ошибка сохранения проекта");
                    }
                  } catch (error) {
                    console.error("Ошибка сохранения:", error);
                    alert("Ошибка сохранения");
                  } finally {
                    setLoading(false);
                  }
                }}
                initialContent={studioProject}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;


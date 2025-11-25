"use client";
import React, { useState, useRef, useEffect } from "react";

const ImageUploader = ({ value, onChange, folder = "uploads", label, accept = "image/*,video/*" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const fileInputRef = useRef(null);

  // Синхронизация preview с value
  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setPreview(data.path);
        onChange(data.path);
      } else {
        alert("Ошибка загрузки файла");
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Ошибка загрузки файла");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isVideo = (path) => {
    if (!path) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    return videoExtensions.some(ext => path.toLowerCase().endsWith(ext));
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      
      {/* Превью */}
      {preview && (
        <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 group">
          {isVideo(preview) ? (
            <video
              src={preview}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400">Изображение не найдено</div>';
              }}
            />
          )}
          <button
            onClick={() => {
              setPreview("");
              onChange("");
            }}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
            title="Удалить"
          >
            ×
          </button>
        </div>
      )}

      {/* Загрузка файла */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-${label || Math.random()}`}
          disabled={uploading}
        />
        <label
          htmlFor={`file-${label || Math.random()}`}
          className={`flex-1 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-[#0BBD83] hover:bg-[#0BBD83]/5 transition-all ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? (
            <span className="text-[#0BBD83]">Загрузка...</span>
          ) : preview ? (
            <span>Заменить файл</span>
          ) : (
            <span>📁 Загрузить файл (фото/видео)</span>
          )}
        </label>
      </div>

      {/* Поле для ввода пути вручную */}
      <div className="relative">
        <input
          type="text"
          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onChange(e.target.value);
          }}
          className="w-full px-3 py-2 border rounded text-sm pr-8"
          placeholder="Или введите путь к файлу (например: /folder/file.png)"
        />
        {preview && (
          <button
            onClick={() => {
              setPreview("");
              onChange("");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            title="Очистить"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;


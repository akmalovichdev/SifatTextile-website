"use client";
import React, { useEffect, useState, useRef } from 'react';
import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';

const StudioEditorWrapper = ({ onSave, initialContent }) => {
  const [editorInstance, setEditorInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);

  useEffect(() => {
    // Загружаем сохраненный проект при монтировании
    const loadProject = async () => {
      try {
        const response = await fetch('/api/admin/studio');
        if (response.ok) {
          const data = await response.json();
          if (data.html || data.css) {
            // Проект будет загружен автоматически через storageManager
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки проекта:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProject();
  }, []);

  useEffect(() => {
    // Получаем доступ к редактору через ref
    if (editorRef.current) {
      const getEditor = () => {
        try {
          // Пытаемся получить редактор разными способами
          if (editorRef.current?.getEditor) {
            const editor = editorRef.current.getEditor();
            if (editor) {
              setEditorInstance(editor);
              return;
            }
          }
          // Альтернативный способ
          if (editorRef.current?.editor) {
            setEditorInstance(editorRef.current.editor);
            return;
          }
        } catch (error) {
          console.error('Ошибка получения редактора:', error);
        }
      };

      // Пробуем получить редактор с задержкой
      const timer = setTimeout(getEditor, 1000);
      return () => clearTimeout(timer);
    }
  }, [editorRef.current]);

  const handleSave = async () => {
    let editor = editorInstance;

    // Если нет экземпляра, пытаемся получить через ref
    if (!editor && editorRef.current) {
      if (editorRef.current.getEditor) {
        editor = editorRef.current.getEditor();
      } else if (editorRef.current.editor) {
        editor = editorRef.current.editor;
      }
    }

    if (editor) {
      try {
        const html = editor.getHtml();
        const css = editor.getCss();
        const projectData = editor.getProjectData();

        if (onSave) {
          await onSave({
            html,
            css,
            projectData
          });
        }
      } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert('Ошибка сохранения проекта');
      }
    } else {
      alert('Редактор еще не загружен. Подождите немного.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-600">Загрузка редактора...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 150px)' }}>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!editorInstance}
          className="bg-[#0BBD83] hover:bg-[#0aa775] text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Сохранить проект
        </button>
      </div>
      <div className="border rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
        <StudioEditor
          ref={editorRef}
          options={{
            project: {
              type: 'web',
              default: {
                pages: initialContent?.pages || [
                  {
                    name: 'Home',
                    component: initialContent?.html || '<div class="container"><h1>Добро пожаловать</h1><p>Начните редактирование</p></div>'
                  },
                ],
                styles: initialContent?.css || ''
              },
            },
            storageManager: {
              type: 'local',
              autosave: true,
              autoload: true,
              stepsBeforeSave: 1,
            },
            canvas: {
              styles: [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
              ],
            },
            i18n: {
              locale: 'ru',
              locales: {
                ru: {
                  styleManager: {
                    empty: 'Выберите элемент для редактирования стилей',
                    layer: 'Слой',
                    fileButton: 'Изображения',
                    selectButton: 'Выбрать',
                    fileInput: 'Выберите изображение',
                  },
                  traitManager: {
                    empty: 'Выберите элемент для редактирования атрибутов',
                    label: 'Компонент настройки',
                  },
                  blockManager: {
                    labels: {
                      text: 'Текст',
                      'text-basic': 'Базовый текст',
                      'text-section': 'Секция текста',
                      link: 'Ссылка',
                      image: 'Изображение',
                      video: 'Видео',
                      map: 'Карта',
                      table: 'Таблица',
                      row: 'Строка',
                      cell: 'Ячейка',
                      'table-section': 'Секция таблицы',
                    },
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StudioEditorWrapper;


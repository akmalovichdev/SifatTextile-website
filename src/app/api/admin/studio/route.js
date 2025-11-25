import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const STUDIO_PROJECT_PATH = path.join(process.cwd(), 'public', 'data', 'studio-project.json');

// Получить проект
export async function GET() {
  try {
    if (existsSync(STUDIO_PROJECT_PATH)) {
      const data = await fs.readFile(STUDIO_PROJECT_PATH, 'utf8');
      return NextResponse.json(JSON.parse(data));
    }
    return NextResponse.json({ html: '', css: '', projectData: null });
  } catch (error) {
    console.error('Ошибка загрузки проекта:', error);
    return NextResponse.json({ error: 'Ошибка загрузки проекта' }, { status: 500 });
  }
}

// Сохранить проект
export async function POST(request) {
  try {
    // Валидация токена
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const data = await request.json();

    // Создаем директорию, если её нет
    const dataDir = path.dirname(STUDIO_PROJECT_PATH);
    if (!existsSync(dataDir)) {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Сохраняем проект
    await fs.writeFile(STUDIO_PROJECT_PATH, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка сохранения проекта:', error);
    return NextResponse.json({ error: 'Ошибка сохранения проекта' }, { status: 500 });
  }
}


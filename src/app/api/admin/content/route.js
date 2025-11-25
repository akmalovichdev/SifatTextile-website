import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'Data.json');

// GET - получить контент
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Ошибка чтения данных' }, { status: 500 });
  }
}

// POST - обновить контент
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Валидация токена (в продакшене использовать более безопасный метод)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }
    
    // Читаем существующие данные, чтобы сохранить news отдельно
    let existingData = {};
    try {
      const existingContent = await fs.readFile(DATA_FILE, 'utf8');
      existingData = JSON.parse(existingContent);
    } catch (err) {
      // Если файл не существует, создаем новый
    }
    
    // Объединяем данные, сохраняя news из существующих данных
    const updatedData = {
      ...existingData,
      ...data,
      news: existingData.news || [], // Сохраняем новости отдельно
    };
    
    await fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing data:', error);
    return NextResponse.json({ error: 'Ошибка записи данных' }, { status: 500 });
  }
}


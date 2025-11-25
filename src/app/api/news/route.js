import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'Data.json');

// GET - получить новости
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData.news || []);
  } catch (error) {
    console.error('Error reading news:', error);
    return NextResponse.json({ error: 'Ошибка чтения новостей' }, { status: 500 });
  }
}

// POST - создать/обновить новость
export async function POST(request) {
  try {
    const newsItem = await request.json();
    
    // Валидация токена
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }
    
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const jsonData = JSON.parse(data);
    
    let news = jsonData.news || [];
    
    if (newsItem.id) {
      // Обновление существующей новости
      const index = news.findIndex(n => n.id === newsItem.id);
      if (index !== -1) {
        news[index] = newsItem;
      }
    } else {
      // Создание новой новости
      newsItem.id = Date.now().toString();
      newsItem.createdAt = new Date().toISOString();
      news.push(newsItem);
    }
    
    jsonData.news = news;
    await fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), 'utf8');
    return NextResponse.json({ success: true, newsItem });
  } catch (error) {
    console.error('Error writing news:', error);
    return NextResponse.json({ error: 'Ошибка записи новости' }, { status: 500 });
  }
}

// DELETE - удалить новость
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Валидация токена
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }
    
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const jsonData = JSON.parse(data);
    
    let news = jsonData.news || [];
    news = news.filter(n => n.id !== id);
    
    jsonData.news = news;
    await fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Ошибка удаления новости' }, { status: 500 });
  }
}


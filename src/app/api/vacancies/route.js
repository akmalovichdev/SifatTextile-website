import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const VACANCIES_FILE = path.join(process.cwd(), 'public', 'data', 'vacancies.json');

// GET - получить вакансии
export async function GET() {
  try {
    try {
      const data = await fs.readFile(VACANCIES_FILE, 'utf8');
      const vacancies = JSON.parse(data);
      return NextResponse.json(vacancies);
    } catch (error) {
      // Если файл не существует, возвращаем пустой массив
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error reading vacancies:', error);
    return NextResponse.json({ error: 'Ошибка чтения вакансий' }, { status: 500 });
  }
}

// POST - создать/обновить вакансию
export async function POST(request) {
  try {
    const vacancy = await request.json();
    
    // Валидация токена
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }
    
    let vacancies = [];
    try {
      const data = await fs.readFile(VACANCIES_FILE, 'utf8');
      vacancies = JSON.parse(data);
    } catch (error) {
      // Файл не существует, создаем новый
    }
    
    if (vacancy.id) {
      // Обновление существующей вакансии
      const index = vacancies.findIndex(v => v.id === vacancy.id);
      if (index !== -1) {
        vacancies[index] = vacancy;
      }
    } else {
      // Создание новой вакансии
      vacancy.id = Date.now().toString();
      vacancy.createdAt = new Date().toISOString();
      vacancies.push(vacancy);
    }
    
    await fs.writeFile(VACANCIES_FILE, JSON.stringify(vacancies, null, 2), 'utf8');
    return NextResponse.json({ success: true, vacancy });
  } catch (error) {
    console.error('Error writing vacancies:', error);
    return NextResponse.json({ error: 'Ошибка записи вакансии' }, { status: 500 });
  }
}

// DELETE - удалить вакансию
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Валидация токена
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }
    
    let vacancies = [];
    try {
      const data = await fs.readFile(VACANCIES_FILE, 'utf8');
      vacancies = JSON.parse(data);
    } catch (error) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
    }
    
    vacancies = vacancies.filter(v => v.id !== id);
    await fs.writeFile(VACANCIES_FILE, JSON.stringify(vacancies, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vacancy:', error);
    return NextResponse.json({ error: 'Ошибка удаления вакансии' }, { status: 500 });
  }
}


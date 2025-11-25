import { NextResponse } from 'next/server';

// Простая авторизация (в продакшене использовать более безопасный метод)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, token: 'admin-token' });
    }
    
    return NextResponse.json({ success: false, error: 'Неверный пароль' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
  }
}


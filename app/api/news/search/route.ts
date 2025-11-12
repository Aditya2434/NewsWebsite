import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '12';

    if (!query) {
      return NextResponse.json(
        { status: 'error', message: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to search news' },
      { status: 500 }
    );
  }
}


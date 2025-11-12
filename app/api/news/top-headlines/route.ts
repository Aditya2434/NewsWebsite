import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '12';
    const country = searchParams.get('country') || 'us';
    const category = searchParams.get('category');

    let url = `${BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    
    if (category) {
      url += `&category=${category}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}


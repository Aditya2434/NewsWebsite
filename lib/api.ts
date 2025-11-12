import axios from 'axios';
import { NewsResponse, Category } from './types';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const fetchTopHeadlines = async (page: number = 1, pageSize: number = 12): Promise<NewsResponse> => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        country: 'us',
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch top headlines');
  }
};

export const fetchNewsByCategory = async (
  category: Category,
  page: number = 1,
  pageSize: number = 12
): Promise<NewsResponse> => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        category,
        country: 'us',
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch news for category: ${category}`);
  }
};

export const searchNews = async (
  query: string,
  page: number = 1,
  pageSize: number = 12
): Promise<NewsResponse> => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        page,
        pageSize,
        sortBy: 'publishedAt',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search news');
  }
};


import axios from 'axios';
import { NewsResponse, Category } from './types';

const BASE_URL = '/api/news';

export const fetchTopHeadlines = async (page: number = 1, pageSize: number = 12): Promise<NewsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
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
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
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
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: query,
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search news');
  }
};


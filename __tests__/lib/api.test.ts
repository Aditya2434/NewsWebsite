import axios from 'axios';
import { fetchTopHeadlines, fetchNewsByCategory, searchNews } from '@/lib/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Functions', () => {
  const mockResponse = {
    data: {
      status: 'ok',
      totalResults: 100,
      articles: [
        {
          source: { id: '1', name: 'Test Source' },
          author: 'Test Author',
          title: 'Test Title',
          description: 'Test Description',
          url: 'https://test.com',
          urlToImage: 'https://test.com/image.jpg',
          publishedAt: '2024-01-01T00:00:00Z',
          content: 'Test Content',
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchTopHeadlines', () => {
    it('should fetch top headlines successfully', async () => {
      mockedAxios.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await fetchTopHeadlines(1, 12);

      expect(result.status).toBe('ok');
      expect(result.articles).toHaveLength(1);
      expect(result.articles[0].title).toBe('Test Title');
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/news/top-headlines', {
        params: { country: 'us', page: 1, pageSize: 12 },
      });
    });

    it('should handle errors', async () => {
      mockedAxios.get = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetchTopHeadlines()).rejects.toThrow('Failed to fetch top headlines');
    });
  });

  describe('fetchNewsByCategory', () => {
    it('should fetch news by category successfully', async () => {
      mockedAxios.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await fetchNewsByCategory('technology', 1, 12);

      expect(result.status).toBe('ok');
      expect(result.articles).toHaveLength(1);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/news/top-headlines', {
        params: { category: 'technology', country: 'us', page: 1, pageSize: 12 },
      });
    });

    it('should handle errors', async () => {
      mockedAxios.get = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetchNewsByCategory('technology')).rejects.toThrow('Failed to fetch news for category: technology');
    });
  });

  describe('searchNews', () => {
    it('should search news successfully', async () => {
      mockedAxios.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await searchNews('test query', 1, 12);

      expect(result.status).toBe('ok');
      expect(result.articles).toHaveLength(1);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/news/search', {
        params: { q: 'test query', page: 1, pageSize: 12 },
      });
    });

    it('should handle errors', async () => {
      mockedAxios.get = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(searchNews('test')).rejects.toThrow('Failed to search news');
    });
  });
});


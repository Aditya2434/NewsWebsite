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
      mockedAxios.create = jest.fn(() => ({
        get: jest.fn().mockResolvedValue(mockResponse),
      } as any));

      const result = await fetchTopHeadlines(1, 12);

      expect(result.status).toBe('ok');
      expect(result.articles).toHaveLength(1);
      expect(result.articles[0].title).toBe('Test Title');
    });

    it('should handle errors', async () => {
      mockedAxios.create = jest.fn(() => ({
        get: jest.fn().mockRejectedValue(new Error('Network error')),
      } as any));

      await expect(fetchTopHeadlines()).rejects.toThrow('Failed to fetch top headlines');
    });
  });

  describe('fetchNewsByCategory', () => {
    it('should fetch news by category successfully', async () => {
      mockedAxios.create = jest.fn(() => ({
        get: jest.fn().mockResolvedValue(mockResponse),
      } as any));

      const result = await fetchNewsByCategory('technology', 1, 12);

      expect(result.status).toBe('ok');
      expect(result.articles).toHaveLength(1);
    });

    it('should handle errors', async () => {
      mockedAxios.create = jest.fn(() => ({
        get: jest.fn().mockRejectedValue(new Error('Network error')),
      } as any));

      await expect(fetchNewsByCategory('technology')).rejects.toThrow('Failed to fetch news for category: technology');
    });
  });

  describe('searchNews', () => {
    it('should search news successfully', async () => {
      mockedAxios.create = jest.fn(() => ({
        get: jest.fn().mockResolvedValue(mockResponse),
      } as any));

      const result = await searchNews('test query', 1, 12);

      expect(result.status).toBe('ok');
      expect(result.articles).toHaveLength(1);
    });

    it('should handle errors', async () => {
      mockedAxios.create = jest.fn(() => ({
        get: jest.fn().mockRejectedValue(new Error('Network error')),
      } as any));

      await expect(searchNews('test')).rejects.toThrow('Failed to search news');
    });
  });
});


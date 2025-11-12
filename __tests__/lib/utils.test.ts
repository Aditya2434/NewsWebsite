import { formatDate, truncateText, getPlaceholderImage } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should return "Just now" for recent dates', () => {
      const now = new Date().toISOString();
      expect(formatDate(now)).toBe('Just now');
    });

    it('should return hours ago for dates within 24 hours', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
      expect(formatDate(twoHoursAgo)).toBe('2 hours ago');
    });

    it('should return days ago for dates within a week', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      expect(formatDate(threeDaysAgo)).toBe('3 days ago');
    });

    it('should return formatted date for older dates', () => {
      const oldDate = '2023-01-01T00:00:00Z';
      const result = formatDate(oldDate);
      expect(result).toContain('Jan');
      expect(result).toContain('2023');
    });
  });

  describe('truncateText', () => {
    it('should not truncate text shorter than max length', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('should truncate text longer than max length', () => {
      const text = 'This is a very long text that needs to be truncated';
      const result = truncateText(text, 20);
      expect(result).toBe('This is a very long ...');
      expect(result.length).toBe(23);
    });

    it('should handle empty string', () => {
      expect(truncateText('', 10)).toBe('');
    });
  });

  describe('getPlaceholderImage', () => {
    it('should return a placeholder image URL', () => {
      const result = getPlaceholderImage();
      expect(result).toContain('placeholder.com');
      expect(result).toContain('No+Image');
    });
  });
});


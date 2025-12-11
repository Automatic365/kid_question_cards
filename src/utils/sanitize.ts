// Basic HTML sanitization to prevent XSS attacks
export function sanitizeText(text: string): string {
  // Remove any HTML tags
  const withoutTags = text.replace(/<[^>]*>/g, '');

  // Limit length to prevent abuse
  const maxLength = 10000;
  return withoutTags.slice(0, maxLength);
}

export function sanitizeFileName(name: string): string {
  // Remove special characters, keep alphanumeric, spaces, dashes, underscores
  const cleaned = name.replace(/[^a-zA-Z0-9\s\-_]/g, '');

  // Limit length
  const maxLength = 100;
  return cleaned.slice(0, maxLength).trim() || 'Untitled Document';
}

export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  const extension = file.name.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

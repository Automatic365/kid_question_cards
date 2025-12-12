import { useState } from 'react';
import type { Document } from '../types';
import { parseMarkdownDocument } from '../utils/parser';
import { sanitizeText, sanitizeFileName, validateFileSize, validateFileType } from '../utils/sanitize';
import { DEFAULT_CONTENT } from '../data/defaultContent';

interface DocumentUploadProps {
  onDocumentCreated: (document: Document) => void;
}

export function DocumentUpload({ onDocumentCreated }: DocumentUploadProps) {
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleLoadDemo = () => {
    setTextContent(DEFAULT_CONTENT);
    setFileName('Kid Question Cards');
    setError('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file type
    if (!validateFileType(file, ['md', 'txt', 'markdown'])) {
      setError('Please upload a .md, .txt, or .markdown file');
      return;
    }

    // Validate file size (5MB max)
    if (!validateFileSize(file, 5)) {
      setError('File size must be less than 5MB');
      return;
    }

    const content = await file.text();
    const sanitizedContent = sanitizeText(content);
    const sanitizedName = sanitizeFileName(file.name);
    createDocument(sanitizedName, sanitizedContent);
  };

  const handleTextSubmit = () => {
    if (!textContent.trim()) return;

    setError('');
    const sanitizedContent = sanitizeText(textContent);
    const name = fileName.trim() || `Document ${new Date().toLocaleDateString()}`;
    const sanitizedName = sanitizeFileName(name);
    createDocument(sanitizedName, sanitizedContent);
  };

  const createDocument = (name: string, content: string) => {
    const { categories, questions } = parseMarkdownDocument(content);

    if (categories.length === 0) {
      setError('No categories found. Please check your document format.');
      return;
    }

    if (questions.length === 0) {
      setError('No questions found. Please ensure your document contains questions ending with "?"');
      return;
    }

    const document: Document = {
      id: `doc-${Date.now()}`,
      name,
      content,
      uploadedAt: Date.now(),
      categories,
      questions,
    };

    onDocumentCreated(document);
  };

  return (
    <div className="upload-container">
      <h1>Let's Play!</h1>
      <p className="subtitle">Parents: Set up the game below</p>

      <div className="demo-section">
        <button onClick={handleLoadDemo} className="kid-btn btn-primary">
          🚀 Play Demo Game
        </button>
      </div>

      <div className="upload-section">
        <h2>Or upload your own questions</h2>
        <div className="file-upload-wrapper">
          <input
            type="file"
            accept=".md,.txt,.markdown"
            onChange={handleFileUpload}
            className="kid-btn"
          />
        </div>
      </div>

      <div className="upload-section">
        {error && <div className="error-message" role="alert">{error}</div>}
        <input
          type="text"
          placeholder="Name your game (e.g. Science Quiz)"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="filename-input"
          maxLength={100}
        />
        <textarea
          placeholder="Paste markdown content here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          rows={8}
          className="content-textarea"
          maxLength={10000}
        />
        <button
          onClick={handleTextSubmit}
          disabled={!textContent.trim()}
          className="kid-btn btn-secondary"
          style={{ width: '100%' }}
        >
          🎮 Start Game
        </button>
      </div>
    </div>
  );
}

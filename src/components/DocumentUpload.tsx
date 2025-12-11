import { useState } from 'react';
import type { Document } from '../types';
import { parseMarkdownDocument } from '../utils/parser';

interface DocumentUploadProps {
  onDocumentCreated: (document: Document) => void;
}

export function DocumentUpload({ onDocumentCreated }: DocumentUploadProps) {
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const content = await file.text();
    createDocument(file.name, content);
  };

  const handleTextSubmit = () => {
    if (!textContent.trim()) return;
    const name = fileName.trim() || `Document ${new Date().toLocaleDateString()}`;
    createDocument(name, textContent);
  };

  const createDocument = (name: string, content: string) => {
    const { categories, questions } = parseMarkdownDocument(content);

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
      <h1>Flashcard Creator</h1>
      <p className="subtitle">Upload a document or paste your content to get started</p>

      <div className="upload-section">
        <h2>Upload File</h2>
        <label className="file-upload-btn">
          <input
            type="file"
            accept=".md,.txt,.markdown"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          Choose File (.md, .txt)
        </label>
      </div>

      <div className="divider">OR</div>

      <div className="upload-section">
        <h2>Paste Content</h2>
        <input
          type="text"
          placeholder="Document name (optional)"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="filename-input"
        />
        <textarea
          placeholder="Paste your markdown content here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          rows={12}
          className="content-textarea"
        />
        <button
          onClick={handleTextSubmit}
          disabled={!textContent.trim()}
          className="submit-btn"
        >
          Create Flashcards
        </button>
      </div>
    </div>
  );
}

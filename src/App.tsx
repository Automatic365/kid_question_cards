import { useState } from 'react';
import type { AppState, Document } from './types';
import { DocumentUpload } from './components/DocumentUpload';
import { CategorySelector } from './components/CategorySelector';
import { Flashcard } from './components/Flashcard';
import { loadState, saveDocument, updateQuestionCompleted } from './utils/storage';
import './App.css';

function App() {
  const [state, setState] = useState<AppState>(() => {
    const loaded = loadState();
    return loaded || {
      documents: [],
      currentDocumentId: null,
      currentCategoryId: null,
    };
  });

  const currentDocument = state.documents.find(d => d.id === state.currentDocumentId);
  const currentCategory = currentDocument?.categories.find(c => c.id === state.currentCategoryId);
  const currentQuestions = currentDocument?.questions.filter(q => q.categoryId === state.currentCategoryId) || [];

  const handleDocumentCreated = (document: Document) => {
    const newState = saveDocument(state, document);
    setState(newState);
  };

  const handleCategorySelect = (categoryId: string) => {
    setState(prev => ({ ...prev, currentCategoryId: categoryId }));
  };

  const handleBackToCategories = () => {
    setState(prev => ({ ...prev, currentCategoryId: null }));
  };

  const handleBackToUpload = () => {
    setState(prev => ({
      ...prev,
      currentDocumentId: null,
      currentCategoryId: null,
    }));
  };

  const handleQuestionComplete = (questionId: string) => {
    const newState = updateQuestionCompleted(state, questionId, true);
    setState(newState);
  };

  // Show flashcard view
  if (currentDocument && currentCategory) {
    return (
      <Flashcard
        questions={currentQuestions}
        category={currentCategory}
        onComplete={handleQuestionComplete}
        onBack={handleBackToCategories}
      />
    );
  }

  // Show category selector
  if (currentDocument) {
    return (
      <CategorySelector
        categories={currentDocument.categories}
        questions={currentDocument.questions}
        onCategorySelect={handleCategorySelect}
        onBack={handleBackToUpload}
      />
    );
  }

  // Show upload screen
  return <DocumentUpload onDocumentCreated={handleDocumentCreated} />;
}

export default App;

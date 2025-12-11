import type { AppState, Document } from '../types';

const STORAGE_KEY = 'flashcard-app-state';

export function loadState(): AppState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load state:', error);
  }
  return null;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

export function saveDocument(state: AppState, document: Document): AppState {
  const newState = {
    ...state,
    documents: [...state.documents.filter(d => d.id !== document.id), document],
    currentDocumentId: document.id,
  };
  saveState(newState);
  return newState;
}

export function updateQuestionCompleted(state: AppState, questionId: string, completed: boolean): AppState {
  const newState = {
    ...state,
    documents: state.documents.map(doc => {
      if (doc.id === state.currentDocumentId) {
        return {
          ...doc,
          questions: doc.questions.map(q =>
            q.id === questionId ? { ...q, completed } : q
          ),
        };
      }
      return doc;
    }),
  };
  saveState(newState);
  return newState;
}

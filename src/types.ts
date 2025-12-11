export interface Question {
  id: string;
  text: string;
  categoryId: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Document {
  id: string;
  name: string;
  content: string;
  uploadedAt: number;
  categories: Category[];
  questions: Question[];
}

export interface AppState {
  documents: Document[];
  currentDocumentId: string | null;
  currentCategoryId: string | null;
}

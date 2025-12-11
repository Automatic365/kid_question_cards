import { useState } from 'react';
import type { Question, Category } from '../types';

interface FlashcardProps {
  questions: Question[];
  category: Category;
  onComplete: (questionId: string) => void;
  onBack: () => void;
}

export function Flashcard({ questions, category, onComplete, onBack }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(questions.length - 1);
    }
  };

  const handleMarkComplete = () => {
    onComplete(currentQuestion.id);
    handleNext();
  };

  if (questions.length === 0) {
    return (
      <div className="flashcard-container">
        <div className="header">
          <button onClick={onBack} className="back-btn">← Back to Categories</button>
        </div>
        <div className="empty-state">
          <p>No questions found in this category.</p>
        </div>
      </div>
    );
  }

  const completedCount = questions.filter(q => q.completed).length;

  return (
    <div className="flashcard-container">
      <div className="header">
        <button onClick={onBack} className="back-btn">← Back to Categories</button>
        <div className="progress-info">
          <span>{currentIndex + 1} / {questions.length}</span>
          <span className="completed-count">{completedCount} completed</span>
        </div>
      </div>

      <div className="flashcard-wrapper">
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }}
          aria-label={isFlipped ? 'Showing question. Click to show category' : 'Showing category. Click to reveal question'}
        >
          <div className="flashcard-face flashcard-front">
            <div className="card-content">
              <p className="card-label">Category</p>
              <h2>{category.name}</h2>
              {category.description && (
                <p className="category-desc">{category.description}</p>
              )}
              <p className="flip-hint">Click or press Enter to reveal question</p>
            </div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="card-content">
              <p className="card-label">Question</p>
              <h2>{currentQuestion.text}</h2>
              {currentQuestion.completed && (
                <span className="completed-badge" aria-label="This question is marked as completed">✓ Completed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="flashcard-controls" aria-label="Flashcard navigation">
        <button onClick={handlePrevious} className="control-btn" aria-label="Go to previous question">
          ← Previous
        </button>
        <button
          onClick={handleMarkComplete}
          className={`control-btn mark-complete ${currentQuestion.completed ? 'completed' : ''}`}
          disabled={currentQuestion.completed}
          aria-label={currentQuestion.completed ? 'Question already completed' : 'Mark this question as completed'}
        >
          {currentQuestion.completed ? '✓ Completed' : 'Mark Complete'}
        </button>
        <button onClick={handleNext} className="control-btn" aria-label="Go to next question">
          Next →
        </button>
      </nav>
    </div>
  );
}

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
    if (!currentQuestion.completed) {
      onComplete(currentQuestion.id);
      // Optional: Add a sound or delay here if we had sounds
    }
    handleNext();
  };

  if (questions.length === 0) {
    return (
      <div className="flashcard-container">
        <div className="header">
          <button onClick={onBack} className="kid-btn btn-nav">⬅ Menu</button>
        </div>
        <div className="empty-state">
          <p>No questions found in this world!</p>
        </div>
      </div>
    );
  }

  const completedCount = questions.filter(q => q.completed).length;

  return (
    <div className="flashcard-container">
      <div className="progress-info">
        <button onClick={onBack} className="kid-btn btn-nav" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          ⬅ Menu
        </button>
        <span>Card {currentIndex + 1} of {questions.length}</span>
        <span className="completed-count">⭐ {completedCount} Done</span>
      </div>

      <div className="flashcard-wrapper">
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }}
        >
          {/* Front of Card: Category/Topic */}
          <div className="flashcard-face flashcard-front">
            <div className="card-content">
              <p className="card-label">The Topic Is...</p>
              <h2>{category.name}</h2>
              {category.description && (
                <p className="category-desc">{category.description}</p>
              )}
              <p className="flip-hint">Tap to flip! 👆</p>
            </div>
          </div>

          {/* Back of Card: The Question */}
          <div className="flashcard-face flashcard-back">
            <div className="card-content">
              <p className="card-label">Your Challenge!</p>
              <h2>{currentQuestion.text}</h2>
              {currentQuestion.completed && (
                <span className="completed-badge">⭐ Completed!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="flashcard-controls">
        <button onClick={handlePrevious} className="kid-btn btn-secondary">
          ⬅ Prev
        </button>

        <button
          onClick={handleMarkComplete}
          className={`kid-btn ${currentQuestion.completed ? 'btn-nav' : 'btn-primary'}`}
          disabled={currentQuestion.completed}
        >
          {currentQuestion.completed ? 'Already Done!' : '✨ I Got It! ✨'}
        </button>

        <button onClick={handleNext} className="kid-btn btn-secondary">
          Next ➡
        </button>
      </nav>
    </div>
  );
}

import type { Category, Question } from '../types';

interface CategorySelectorProps {
  categories: Category[];
  questions: Question[];
  onCategorySelect: (categoryId: string) => void;
  onBack: () => void;
}

export function CategorySelector({ categories, questions, onCategorySelect, onBack }: CategorySelectorProps) {
  const getCategoryProgress = (categoryId: string) => {
    const categoryQuestions = questions.filter(q => q.categoryId === categoryId);
    const completed = categoryQuestions.filter(q => q.completed).length;
    return { completed, total: categoryQuestions.length };
  };

  return (
    <div className="category-container">
      <div className="header">
        <button onClick={onBack} className="kid-btn btn-nav">
          ⬅ Menu
        </button>
        <h1>Pick a World! 🌍</h1>
      </div>

      <div className="categories-grid">
        {categories.map(category => {
          const progress = getCategoryProgress(category.id);
          const percentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

          return (
            <div
              key={category.id}
              className="category-card"
              onClick={() => onCategorySelect(category.id)}
            >
              <h3>{category.name}</h3>
              {category.description && (
                <p className="category-description">{category.description}</p>
              )}
              <div className="category-stats">
                <span>⭐ {progress.completed} / {progress.total} Stars</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

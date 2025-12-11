import type { Category, Question } from '../types';

export function parseMarkdownDocument(content: string): { categories: Category[]; questions: Question[] } {
  const lines = content.split('\n');
  const categories: Category[] = [];
  const questions: Question[] = [];

  let currentCategory: Category | null = null;
  let descriptionBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      continue;
    }

    // Check if line is a heading (category)
    // Matches: "# Category", "## Category", or just "Category Name" followed by description
    const headingMatch = line.match(/^#+\s*(.+)$/) || (!line.endsWith('?') && !line.startsWith('Best for:') && i < lines.length - 1 && lines[i + 1].trim().startsWith('Best for:'));

    if (headingMatch || (line && !line.endsWith('?') && !line.startsWith('Best for:') && i < lines.length - 1 && lines[i + 1].trim().startsWith('Best for:'))) {
      // Save previous category's description
      if (currentCategory && descriptionBuffer.length > 0) {
        currentCategory.description = descriptionBuffer.join(' ').trim();
        descriptionBuffer = [];
      }

      // Create new category
      const categoryName = headingMatch ? (typeof headingMatch === 'object' ? headingMatch[1] : line) : line;
      const categoryId = `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      currentCategory = {
        id: categoryId,
        name: categoryName.trim(),
      };
      categories.push(currentCategory);
      continue;
    }

    // Check if line is a description (starts with "Best for:")
    if (line.startsWith('Best for:')) {
      descriptionBuffer.push(line);
      continue;
    }

    // Check if line is a question (ends with "?")
    if (line.endsWith('?') && currentCategory) {
      const questionId = `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      questions.push({
        id: questionId,
        text: line,
        categoryId: currentCategory.id,
        completed: false,
      });
    }
  }

  // Save last category's description
  if (currentCategory && descriptionBuffer.length > 0) {
    currentCategory.description = descriptionBuffer.join(' ').trim();
  }

  return { categories, questions };
}

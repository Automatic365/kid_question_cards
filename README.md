# Flashcard Creator App

A modern flashcard application that transforms markdown documents into interactive study sessions with category-based organization.

## Features

- **Multiple Input Methods**: Upload markdown/text files OR paste content directly
- **Smart Parsing**: Automatically extracts categories and questions from your documents
- **Interactive Flashcards**: Beautiful flip animations showing category → question
- **Progress Tracking**: Mark questions as completed and track your progress per category
- **Persistent Storage**: All documents and progress saved in localStorage
- **Responsive Design**: Works great on desktop and mobile
- **Dark Mode Support**: Automatically adapts to your system preferences

## How It Works

### Document Format

The app parses markdown documents with the following structure:

```markdown
Category Name

Best for: Description of the category

Question 1?
Question 2?
Question 3?

Another Category

Best for: Another description

Question 4?
Question 5?
```

### Example

```markdown
🤪 Silly & Imaginative

Best for: Getting big laughs and waking up tired brains.

If you could design a new animal by combining two existing ones, what would it be called and what would it look like?
If we had to live in a house made entirely of food, what food would you want it to be?
Would you rather have spaghetti for hair or sweat maple syrup?
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to http://localhost:5173/

### Build for Production

```bash
npm run build
```

## Usage

1. **Upload/Paste**: Start by uploading a markdown file or pasting your content
2. **Select Category**: Browse all available categories with progress indicators
3. **Study**: Click flashcards to flip from category → question
4. **Track Progress**: Mark questions as completed to track your learning

## Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- CSS with animations and dark mode support
- localStorage for data persistence

## File Structure

```
src/
├── components/
│   ├── DocumentUpload.tsx    # Upload/paste interface
│   ├── CategorySelector.tsx  # Category grid with progress
│   └── Flashcard.tsx         # Flip card component
├── utils/
│   ├── parser.ts             # Markdown parser
│   └── storage.ts            # localStorage utilities
├── types.ts                   # TypeScript interfaces
├── App.tsx                    # Main app component
└── App.css                    # Styles
```

## Future Enhancements

Potential features to add:
- Export/import data as JSON
- Shuffle questions within categories
- Spaced repetition algorithm
- Multiple document management
- Search functionality
- Custom themes
- Share flashcard sets

## License

MIT

export interface ParagraphAnalysis {
  originalIndex: number; // 1-based index
  text: string;
  words: number;
  characters: number;
  charactersWithoutSpaces: number;
  sentences: number;
  readingTime: number; // in seconds
  percentageOfTotal: number;
}

export interface DocumentAnalysis {
  totalWords: number;
  totalParagraphs: number;
  totalCharacters: number;
  charactersWithoutSpaces: number;
  totalSentences: number;
  averageWordsPerParagraph: number;
  longestParagraph: {
    index: number;
    words: number;
  } | null;
  shortestParagraph: {
    index: number;
    words: number;
  } | null;
  readingTime: number; // in seconds
  paragraphs: ParagraphAnalysis[];
}

export type SortOption = 'original' | 'words-asc' | 'words-desc' | 'sentences-desc' | 'length-desc';

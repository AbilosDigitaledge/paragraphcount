import { DocumentAnalysis, ParagraphAnalysis } from '../types';

/**
 * Counts words in a string with full Unicode support.
 * Correctly handles multiple spaces, tabs, contractions, and hyphens.
 */
export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  
  // \p{L} matches letters, \p{N} matches numbers.
  // Supports contractions like "don't" or "l'élève" and hyphenated words like "co-worker".
  const regex = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*(?:-[\p{L}\p{N}]+)*/gu;
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Counts characters in a string, optionally excluding all whitespace.
 */
export function countCharacters(text: string, excludeSpaces: boolean): number {
  if (!text) return 0;
  if (excludeSpaces) {
    return text.replace(/\s/g, '').length;
  }
  return text.length;
}

/**
 * Counts sentences in a string, with robust handling for decimals and common abbreviations.
 */
export function countSentences(text: string): number {
  if (!text || !text.trim()) return 0;
  
  // Temporarily mask decimal numbers to avoid splitting on dots (e.g. 3.14 -> 3_14)
  let cleanText = text.replace(/(\d)\.(\d)/g, '$1_$2');
  
  // Common abbreviations to protect from causing sentence splits.
  const abbreviations = [
    'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr',
    'e\\.g', 'i\\.e', 'v\\.s', 'vs', 'etc', 'al', 'co', 'ltd', 'inc',
    'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
    'a\\.m', 'p\\.m', 'st', 'ave', 'rd', 'bldg', 'approx'
  ];
  
  // Replace abbreviation dots with underscores so they don't trigger splits
  for (const abbr of abbreviations) {
    const regex = new RegExp(`\\b${abbr}\\.`, 'gi');
    cleanText = cleanText.replace(regex, abbr + '_');
  }
  
  // Split on sentence endings: . ! ? followed by space, quote, or boundary
  const sentences = cleanText.match(/[^.!?]+(?:[.!?]+|$)/g);
  
  if (!sentences) return 0;
  
  // Filter out elements that are purely whitespace/punctuation and verify they contain actual characters
  const validSentences = sentences.filter(s => {
    const trimmed = s.trim();
    return trimmed.length > 0 && /[\p{L}\p{N}]/u.test(trimmed);
  });
  
  return validSentences.length;
}

/**
 * Splits text into paragraphs based on blank lines or single line breaks.
 */
export function parseParagraphs(text: string, treatEveryLineAsParagraph: boolean): string[] {
  if (!text) return [];
  
  if (treatEveryLineAsParagraph) {
    return text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  } else {
    // Split by two or more newlines (with optional trailing whitespace on the blank lines)
    return text
      .split(/\r?\n\s*\r?\n/)
      .map(para => para.trim())
      .filter(para => para.length > 0);
  }
}

/**
 * Helper to format reading time in seconds into a clean string.
 */
export function formatReadingTime(seconds: number): string {
  if (seconds <= 0) return '0 sec';
  if (seconds < 1) return '< 1 sec';
  if (seconds < 60) {
    return `~${Math.round(seconds)} sec`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (secs === 0) {
    return `~${mins} min`;
  }
  return `~${mins} min ${secs} sec`;
}

/**
 * Analyzes a full block of text and returns a comprehensive DocumentAnalysis object.
 */
export function analyzeDocument(
  text: string,
  treatEveryLineAsParagraph: boolean = false,
  wpm: number = 200
): DocumentAnalysis {
  const totalWords = countWords(text);
  const totalCharacters = countCharacters(text, false);
  const charactersWithoutSpaces = countCharacters(text, true);
  const totalSentences = countSentences(text);
  // Formula: readingTime = totalWords / (wpm / 60)
  const readingTime = totalWords > 0 ? Math.max(1, Math.round((totalWords / wpm) * 60)) : 0;
  
  const rawParagraphs = parseParagraphs(text, treatEveryLineAsParagraph);
  const totalParagraphs = rawParagraphs.length;
  
  let longestPara: { index: number; words: number } | null = null;
  let shortestPara: { index: number; words: number } | null = null;
  
  const paragraphs: ParagraphAnalysis[] = rawParagraphs.map((paraText, idx) => {
    const originalIndex = idx + 1;
    const words = countWords(paraText);
    const characters = countCharacters(paraText, false);
    const paraCharsNoSpaces = countCharacters(paraText, true);
    const sentences = countSentences(paraText);
    const paraReadingTime = words > 0 ? Math.max(1, Math.round((words / wpm) * 60)) : 0;
    const percentageOfTotal = totalWords > 0 ? parseFloat(((words / totalWords) * 100).toFixed(1)) : 0;
    
    if (words > 0) {
      if (!longestPara || words > (longestPara as any).words) {
        longestPara = { index: originalIndex, words };
      }
      if (!shortestPara || words < (shortestPara as any).words) {
        shortestPara = { index: originalIndex, words };
      }
    }
    
    return {
      originalIndex,
      text: paraText,
      words,
      characters,
      charactersWithoutSpaces: paraCharsNoSpaces,
      sentences,
      readingTime: paraReadingTime,
      percentageOfTotal
    };
  });
  
  // If there are empty paragraphs (unlikely since we filter), or if words = 0
  const averageWordsPerParagraph = totalParagraphs > 0 ? parseFloat((totalWords / totalParagraphs).toFixed(1)) : 0;
  
  return {
    totalWords,
    totalParagraphs,
    totalCharacters,
    charactersWithoutSpaces,
    totalSentences,
    averageWordsPerParagraph,
    longestParagraph: longestPara,
    shortestParagraph: shortestPara,
    readingTime,
    paragraphs
  };
}

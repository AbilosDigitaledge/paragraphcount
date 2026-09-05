import React, { useState } from 'react';
import { ParagraphAnalysis, DocumentAnalysis, SortOption } from '../types';
import { formatReadingTime } from '../utils/textAnalyzer';
import {
  Copy,
  Check,
  Download,
  Printer,
  ArrowUpDown,
  AlignLeft,
  ChevronDown,
  Info,
  ExternalLink,
  SlidersHorizontal,
  Layers
} from 'lucide-react';

interface ParagraphsListProps {
  analysis: DocumentAnalysis;
  rawText: string;
}

export default function ParagraphsList({ analysis, rawText }: ParagraphsListProps) {
  const { paragraphs, totalWords, totalParagraphs, totalCharacters, charactersWithoutSpaces, totalSentences, averageWordsPerParagraph, readingTime } = analysis;
  const [sortOption, setSortOption] = useState<SortOption>('original');
  const [copiedStatus, setCopiedStatus] = useState<'none' | 'results' | 'report'>('none');
  const [activeTab, setActiveTab] = useState<'all' | 'dense' | 'light'>('all');

  const hasContent = paragraphs.length > 0;

  // Sorting logic
  const getSortedParagraphs = () => {
    const list = [...paragraphs];
    switch (sortOption) {
      case 'words-desc':
        return list.sort((a, b) => b.words - a.words);
      case 'words-asc':
        return list.sort((a, b) => a.words - b.words);
      case 'sentences-desc':
        return list.sort((a, b) => b.sentences - a.sentences);
      case 'length-desc':
        return list.sort((a, b) => b.characters - a.characters);
      default:
        return list; // 'original' (by originalIndex)
    }
  };

  const sortedParagraphs = getSortedParagraphs();

  // Dense vs light filtering (e.g. dense paragraphs are those above the average word count)
  const filteredParagraphs = sortedParagraphs.filter(p => {
    if (activeTab === 'dense') {
      return p.words >= averageWordsPerParagraph;
    }
    if (activeTab === 'light') {
      return p.words < averageWordsPerParagraph;
    }
    return true;
  });

  // Action: Copy basic results
  const handleCopyResults = () => {
    const lines = paragraphs.map(p => `Paragraph ${p.originalIndex}: ${p.words} words (${p.characters} chars, ${p.sentences} sentences)`);
    const summaryText = `${lines.join('\n')}\n\nTotal Words: ${totalWords}\nTotal Paragraphs: ${totalParagraphs}`;
    
    navigator.clipboard.writeText(summaryText);
    setCopiedStatus('results');
    setTimeout(() => setCopiedStatus('none'), 2000);
  };

  // Action: Copy full analysis report
  const handleCopyFullReport = () => {
    const timestamp = new Date().toLocaleString();
    let report = `===================================================
PARAGRAPHCOUNT.COM - TEXT STRUCTURE REPORT
===================================================
Generated on: ${timestamp}

--- DOCUMENT METRICS SUMMARY ---
Total Words: ${totalWords}
Total Paragraphs: ${totalParagraphs}
Total Sentences: ${totalSentences}
Total Characters: ${totalCharacters} (excluding spaces: ${charactersWithoutSpaces})
Average Words / Paragraph: ${averageWordsPerParagraph}
Estimated Reading Time: ${formatReadingTime(readingTime)}

--- INDIVIDUAL PARAGRAPH ANALYSIS ---
`;

    paragraphs.forEach(p => {
      report += `
Paragraph #${p.originalIndex}
---------------------------------------------------
Word Count: ${p.words} words (${p.percentageOfTotal}% of text)
Sentences: ${p.sentences}
Characters: ${p.characters} (excluding spaces: ${p.charactersWithoutSpaces})
Reading Time: ${formatReadingTime(p.readingTime)}

TEXT EXTRACT:
"${p.text.length > 180 ? p.text.substring(0, 180) + '...' : p.text}"
`;
    });

    report += `\n===================================================`;

    navigator.clipboard.writeText(report);
    setCopiedStatus('report');
    setTimeout(() => setCopiedStatus('none'), 2000);
  };

  // Action: Export client-side CSV
  const handleExportCSV = () => {
    const headers = ['Paragraph Index', 'Word Count', 'Percentage Of Total', 'Sentences', 'Characters', 'Characters Exclude Spaces', 'Est Reading Time (Seconds)', 'Text Sample'];
    const rows = paragraphs.map(p => {
      const cleanText = p.text.replace(/"/g, '""').replace(/\r?\n/g, ' ');
      const excerpt = cleanText.length > 100 ? `${cleanText.substring(0, 100)}...` : cleanText;
      return [
        p.originalIndex,
        p.words,
        `${p.percentageOfTotal}%`,
        p.sentences,
        p.characters,
        p.charactersWithoutSpaces,
        p.readingTime,
        `"${excerpt}"`
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ParagraphCount_Analysis_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Action: Print report
  const handlePrint = () => {
    window.print();
  };

  // Maximum word count among paragraphs for proportional visual bars
  const maxWords = paragraphs.length > 0 ? Math.max(...paragraphs.map(p => p.words)) : 1;

  if (!hasContent) {
    return (
      <div className="p-8 text-center border border-dashed border-brand-charcoal/40 dark:border-neutral-800 rounded-none bg-brand-cream/30">
        <AlignLeft className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
        <p className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wider font-bold">
          Start typing or paste text in the workspace above to generate individual paragraph statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* List Toolbar Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-brand-charcoal/30 dark:border-neutral-800">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4.5 h-4.5 text-brand-charcoal/70" />
          <span className="text-xs uppercase tracking-wider font-black text-brand-charcoal dark:text-neutral-200">
            Analysis Results
          </span>
          <span className="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-none font-mono">
            {totalParagraphs} detected
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sorting Dropdown */}
          <div className="flex items-center space-x-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 whitespace-nowrap">Sort:</span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="pl-2 pr-7 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1E1C19] text-brand-charcoal dark:text-neutral-300 appearance-none cursor-pointer focus:border-brand-rust focus:outline-none"
              >
                <option value="original">Original Order</option>
                <option value="words-desc">Words (High to Low)</option>
                <option value="words-asc">Words (Low to High)</option>
                <option value="sentences-desc">Sentences (High to Low)</option>
                <option value="length-desc">Length (High to Low)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Export Buttons */}
          <button
            onClick={handleCopyResults}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1E1C19] text-brand-charcoal dark:text-neutral-300 hover:text-brand-rust transition-all cursor-pointer"
            title="Copy simplified paragraph statistics"
          >
            {copiedStatus === 'results' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedStatus === 'results' ? 'Copied' : 'Copy List'}</span>
          </button>

          <button
            onClick={handleCopyFullReport}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1E1C19] text-brand-charcoal dark:text-neutral-300 hover:text-brand-rust transition-all cursor-pointer"
            title="Copy detailed diagnostic text report"
          >
            {copiedStatus === 'report' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedStatus === 'report' ? 'Copied' : 'Copy Report'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1E1C19] text-brand-charcoal dark:text-neutral-300 hover:text-brand-rust transition-all cursor-pointer"
            title="Download analysis as a CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1E1C19] text-brand-charcoal dark:text-neutral-300 hover:text-brand-rust transition-all cursor-pointer"
            title="Print structured report"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Segmented filter tabs */}
      <div className="flex border-b border-brand-charcoal/30 dark:border-neutral-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'border-brand-rust text-brand-rust'
              : 'border-transparent text-neutral-400 hover:text-brand-charcoal dark:hover:text-neutral-200'
          }`}
        >
          All Paragraphs ({paragraphs.length})
        </button>
        <button
          onClick={() => setActiveTab('dense')}
          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'dense'
              ? 'border-brand-rust text-brand-rust'
              : 'border-transparent text-neutral-400 hover:text-brand-charcoal dark:hover:text-neutral-200'
          }`}
          title="Paragraphs with word count greater than or equal to document average"
        >
          Dense / Long ({paragraphs.filter(p => p.words >= averageWordsPerParagraph).length})
        </button>
        <button
          onClick={() => setActiveTab('light')}
          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'light'
              ? 'border-brand-rust text-brand-rust'
              : 'border-transparent text-neutral-400 hover:text-brand-charcoal dark:hover:text-neutral-200'
          }`}
          title="Paragraphs with word count less than document average"
        >
          Concise / Short ({paragraphs.filter(p => p.words < averageWordsPerParagraph).length})
        </button>
      </div>

      {/* Desktop Responsive Table View */}
      <div className="hidden md:block overflow-hidden border border-brand-charcoal dark:border-neutral-800 rounded-none bg-white dark:bg-[#1E1C19] shadow-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-brand-charcoal dark:border-neutral-800 bg-brand-cream/80 dark:bg-neutral-900/40 text-[10px] font-bold text-brand-charcoal dark:text-neutral-400 uppercase tracking-widest">
              <th className="py-3.5 px-4 w-28 text-center">Paragraph</th>
              <th className="py-3.5 px-4 w-32 text-right">Words</th>
              <th className="py-3.5 px-4 w-40">Proportions</th>
              <th className="py-3.5 px-4 text-right">Sentences</th>
              <th className="py-3.5 px-4 text-right">Characters</th>
              <th className="py-3.5 px-4 text-right">Excl. Spaces</th>
              <th className="py-3.5 px-4 text-right">Read Time</th>
              <th className="py-3.5 px-4 text-right w-20">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-charcoal/10 dark:divide-neutral-850">
            {filteredParagraphs.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-xs uppercase tracking-wider text-neutral-400">
                  No paragraphs match the selected density filter.
                </td>
              </tr>
            ) : (
              filteredParagraphs.map((p) => {
                const relativeWidth = Math.max(4, Math.round((p.words / maxWords) * 100));
                const isDense = p.words >= averageWordsPerParagraph;
                return (
                  <tr
                    key={p.originalIndex}
                    className="hover:bg-brand-cream/20 dark:hover:bg-neutral-850/40 transition-colors duration-150 group"
                  >
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-none border border-brand-charcoal/20 dark:border-neutral-850 bg-brand-cream/40 dark:bg-neutral-850 text-xs font-bold text-brand-charcoal dark:text-neutral-300">
                        {p.originalIndex}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-brand-charcoal dark:text-neutral-100 text-sm">
                      {p.words.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full flex items-center space-x-2">
                        <div className="w-full bg-brand-cream dark:bg-neutral-850 h-3 rounded-none overflow-hidden border border-brand-charcoal/10 dark:border-neutral-800">
                          <div
                            className={`h-full rounded-none transition-all duration-300 ${
                              isDense
                                ? 'bg-brand-rust'
                                : 'bg-brand-charcoal/50 dark:bg-neutral-600'
                            }`}
                            style={{ width: `${relativeWidth}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono w-6 text-right">
                          {relativeWidth}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-neutral-600 dark:text-neutral-300">
                      {p.sentences}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-neutral-600 dark:text-neutral-300">
                      {p.characters.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-neutral-400 dark:text-neutral-400">
                      {p.charactersWithoutSpaces.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-neutral-600 dark:text-neutral-300 font-mono">
                      {formatReadingTime(p.readingTime)}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-xs text-brand-rust font-mono">
                      {p.percentageOfTotal}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Touch-Friendly Card List View */}
      <div className="block md:hidden space-y-4">
        {filteredParagraphs.length === 0 ? (
          <div className="py-8 text-center text-xs uppercase tracking-wider text-neutral-400">
            No paragraphs match the selected filter.
          </div>
        ) : (
          filteredParagraphs.map((p) => {
            const relativeWidth = Math.max(4, Math.round((p.words / maxWords) * 100));
            const isDense = p.words >= averageWordsPerParagraph;
            return (
              <div
                key={p.originalIndex}
                className="p-4 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1C1A18] space-y-3.5 transition-all duration-150"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-none border border-brand-charcoal/20 bg-brand-cream/40 dark:bg-neutral-850 text-xs font-bold text-brand-charcoal dark:text-neutral-300">
                    Paragraph #{p.originalIndex}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold font-display text-brand-rust">
                      {p.words}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 ml-1">words</span>
                  </div>
                </div>

                {/* Mobile relative visual bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                    <span>Length weight</span>
                    <span>{relativeWidth}% of max</span>
                  </div>
                  <div className="w-full bg-brand-cream dark:bg-neutral-850 h-3 rounded-none overflow-hidden border border-brand-charcoal/10 dark:border-neutral-800">
                    <div
                      className={`h-full rounded-none transition-all duration-300 ${
                        isDense
                          ? 'bg-brand-rust'
                          : 'bg-brand-charcoal/50 dark:bg-neutral-600'
                      }`}
                      style={{ width: `${relativeWidth}%` }}
                    />
                  </div>
                </div>

                {/* Split Metrics Block */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2.5 border-t border-brand-charcoal/10 dark:border-neutral-800">
                  <div className="flex flex-col">
                    <span className="text-neutral-400 text-[9px] uppercase font-bold">Sentences</span>
                    <span className="font-bold text-brand-charcoal dark:text-neutral-200">{p.sentences}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-400 text-[9px] uppercase font-bold">Reading Time</span>
                    <span className="font-bold text-brand-charcoal dark:text-neutral-200 font-mono">{formatReadingTime(p.readingTime)}</span>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-neutral-400 text-[9px] uppercase font-bold">Characters</span>
                    <span className="font-bold text-brand-charcoal dark:text-neutral-200">
                      {p.characters} <span className="text-neutral-400 font-normal">/</span> {p.charactersWithoutSpaces}
                    </span>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-neutral-400 text-[9px] uppercase font-bold">Document share</span>
                    <span className="font-bold text-brand-rust dark:text-orange-400 font-mono font-bold">{p.percentageOfTotal}%</span>
                  </div>
                </div>

                {/* Excerpt helper */}
                <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 italic bg-brand-cream/30 dark:bg-[#1E1C19] p-2 border border-brand-charcoal/15 dark:border-neutral-800">
                  "{p.text.length > 90 ? p.text.substring(0, 90) + '...' : p.text}"
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* HIDDEN PRINTER-FRIENDLY BLOCK */}
      <div className="hidden print:block print:absolute print:top-0 print:left-0 print:w-full print:bg-white print:text-black">
        <h1 className="text-2xl font-bold mb-1">ParagraphCount Structure Diagnostic</h1>
        <p className="text-xs text-neutral-500 mb-6">Generated on {new Date().toLocaleString()}</p>
        
        <div className="border border-black p-4 mb-6">
          <h2 className="text-lg font-bold mb-3">Overall Document Statistics</h2>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div><strong>Total Words:</strong> {totalWords}</div>
            <div><strong>Total Paragraphs:</strong> {totalParagraphs}</div>
            <div><strong>Total Sentences:</strong> {totalSentences}</div>
            <div><strong>Total Characters:</strong> {totalCharacters}</div>
            <div><strong>Characters (No Spaces):</strong> {charactersWithoutSpaces}</div>
            <div><strong>Avg Words/Paragraph:</strong> {averageWordsPerParagraph}</div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-3">Paragraph Breakdown</h2>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-2">Para #</th>
              <th className="py-2 text-right">Words</th>
              <th className="py-2 text-right">Sentences</th>
              <th className="py-2 text-right">Characters</th>
              <th className="py-2 text-right">Excl. Spaces</th>
              <th className="py-2 text-right">Read Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {paragraphs.map((p) => (
              <tr key={p.originalIndex}>
                <td className="py-2">#{p.originalIndex}</td>
                <td className="py-2 text-right font-bold">{p.words}</td>
                <td className="py-2 text-right">{p.sentences}</td>
                <td className="py-2 text-right">{p.characters}</td>
                <td className="py-2 text-right">{p.charactersWithoutSpaces}</td>
                <td className="py-2 text-right">{formatReadingTime(p.readingTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from 'react';
import { DocumentAnalysis } from '../types';
import { formatReadingTime } from '../utils/textAnalyzer';
import { FileText, Hash, AlignLeft, BarChart2, Info, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

interface StatsDashboardProps {
  analysis: DocumentAnalysis;
}

export default function StatsDashboard({ analysis }: StatsDashboardProps) {
  const {
    totalWords,
    totalParagraphs,
    totalCharacters,
    charactersWithoutSpaces,
    totalSentences,
    averageWordsPerParagraph,
    longestParagraph,
    shortestParagraph,
    readingTime
  } = analysis;

  const hasContent = totalParagraphs > 0;

  // Render a helper card for KPIs
  const kpiItems = [
    {
      label: 'Total Words',
      value: hasContent ? totalWords.toLocaleString() : '—',
      icon: <FileText className="w-5 h-5 text-brand-rust" />,
      colorClass: 'text-brand-rust bg-brand-cream dark:bg-[#121110]'
    },
    {
      label: 'Paragraphs',
      value: hasContent ? totalParagraphs.toLocaleString() : '—',
      icon: <AlignLeft className="w-5 h-5 text-brand-charcoal dark:text-neutral-300" />,
      colorClass: 'text-brand-charcoal dark:text-white bg-neutral-100 dark:bg-neutral-800'
    },
    {
      label: 'Total Sentences',
      value: hasContent ? totalSentences.toLocaleString() : '—',
      icon: <Hash className="w-5 h-5 text-brand-charcoal dark:text-neutral-300" />,
      colorClass: 'text-brand-charcoal dark:text-white bg-neutral-100 dark:bg-neutral-800'
    },
    {
      label: 'Avg. Words / Para',
      value: hasContent ? `${averageWordsPerParagraph}` : '—',
      icon: <BarChart2 className="w-5 h-5 text-brand-rust" />,
      colorClass: 'text-brand-rust bg-brand-cream dark:bg-[#121110]'
    }
  ];

  return (
    <div id="stats-dashboard" className="space-y-4">
      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1C1A18] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                {item.label}
              </span>
              <div className={`p-1.5 rounded-none ${item.colorClass}`}>
                {item.icon}
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-brand-charcoal dark:text-white tracking-tight">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Character Metrics */}
        <div className="p-4 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1C1A18] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:text-neutral-200 mb-3 flex items-center space-x-1.5">
              <span>Characters</span>
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">With Spaces</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {hasContent ? totalCharacters.toLocaleString() : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">Without Spaces</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {hasContent ? charactersWithoutSpaces.toLocaleString() : '—'}
                </span>
              </div>
            </div>
          </div>
          {hasContent && (
            <div className="mt-3 pt-3 border-t border-neutral-150 dark:border-neutral-800 text-[10px] text-neutral-400 font-mono">
              Whitespace represents {Math.round(((totalCharacters - charactersWithoutSpaces) / (totalCharacters || 1)) * 100)}% of the total size.
            </div>
          )}
        </div>

        {/* Reading Time */}
        <div className="p-4 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1C1A18] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:text-neutral-200 mb-3 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>Reading Time</span>
            </h4>
            <div className="text-xl sm:text-2xl font-bold font-display text-brand-rust mb-2">
              {hasContent ? formatReadingTime(readingTime) : '—'}
            </div>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-400 leading-normal">
              Estimated at <strong>{averageWordsPerParagraph > 0 ? '200' : '0'} WPM</strong>.
            </p>
          </div>
        </div>

        {/* Extremes (Longest / Shortest) */}
        <div className="p-4 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1C1A18] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:text-neutral-200 mb-3">
              Paragraph Spans
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-1 text-neutral-500 dark:text-neutral-400">
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-rust" />
                  <span>Longest</span>
                </span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 text-xs font-mono">
                  {hasContent && longestParagraph
                    ? `P. ${longestParagraph.index} (${longestParagraph.words} w)`
                    : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-1 text-neutral-500 dark:text-neutral-400">
                  <ArrowDownRight className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Shortest</span>
                </span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200 text-xs font-mono">
                  {hasContent && shortestParagraph
                    ? `P. ${shortestParagraph.index} (${shortestParagraph.words} w)`
                    : '—'}
                </span>
              </div>
            </div>
          </div>
          {hasContent && longestParagraph && shortestParagraph && (
            <div className="mt-3 pt-3 border-t border-neutral-150 dark:border-neutral-800 text-[10px] text-neutral-400 font-mono">
              Spread size variation: {longestParagraph.words - shortestParagraph.words} words.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

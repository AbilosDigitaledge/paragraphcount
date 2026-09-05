import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: "How do I count words in each paragraph?",
    answer: "Simply paste or type your draft into the text workspace above. Our system automatically parses your writing in real-time and produces a paragraph-by-paragraph breakdown immediately. No buttons, submit actions, or accounts required."
  },
  {
    question: "How does the paragraph word counter work?",
    answer: "The analyzer processes your text client-side using JavaScript. It detects paragraph delimiters (such as blank line boundaries), counts individual words using a regex matching Unicode characters, counts characters, and estimates sentence counts by locating ending punctuations (. ! ?) while bypassing common decimal notations or title abbreviations."
  },
  {
    question: "Does ParagraphCount store my text?",
    answer: "No. Privacy is our top priority. All text parsing, counting, and metrics are computed locally in your web browser. Absolutely no text, drafts, or files are uploaded to any remote server or analytics pipeline."
  },
  {
    question: "Can I use ParagraphCount on my phone?",
    answer: "Yes, the tool is designed mobile-first. When opened on mobile, the layout stacks the editor and results, turning desktop tables into touch-friendly cards for absolute readability without awkward horizontal scrolling."
  },
  {
    question: "Does the tool count characters too?",
    answer: "Yes. For every paragraph, and for the overall document, the tool displays total characters (with spaces) and characters excluding spaces (letters, numbers, and punctuation only) instantly."
  },
  {
    question: "Can I export paragraph word counts?",
    answer: "Yes. You can copy the simplified list, copy the complete formatted text diagnostic report, or download a spreadsheet-compatible CSV file of your analysis with one click."
  },
  {
    question: "How are paragraphs detected?",
    answer: "By default, paragraphs are identified when they are separated by one or more empty blank lines. If you paste single-spaced lines (where every line is a standalone paragraph), you can activate 'Treat every line as a paragraph' under settings."
  },
  {
    question: "Does it work with long documents?",
    answer: "Yes. The counting engine is highly optimized for performance and can process tens of thousands of words in milliseconds without causing page lag or layout shifts."
  },
  {
    question: "Does it count words in different languages?",
    answer: "Yes. The word counting regex supports Unicode characters (\\p{L}), ensuring accurate counts for accented letters, umlauts, and special diacritics in Spanish, French, German, and many other languages."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 py-8 border-t border-brand-charcoal dark:border-neutral-800 transition-colors duration-200">
      <div className="flex items-center space-x-2.5 justify-center mb-2">
        <HelpCircle className="w-5 h-5 text-brand-rust" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-charcoal dark:text-neutral-50 font-display">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-xs uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400 text-center max-w-xl mx-auto mb-8">
        Have questions about counts, privacy, or exports? Find instant answers below.
      </p>

      <div className="space-y-3">
        {FAQ_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-brand-charcoal dark:border-neutral-800 rounded-none overflow-hidden bg-white dark:bg-[#1C1A18] transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-brand-charcoal dark:text-neutral-100 hover:bg-brand-cream/30 dark:hover:bg-[#1E1C19] transition-colors focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-display pr-4">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-brand-rust flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-brand-charcoal/40 dark:text-neutral-400 flex-shrink-0" />
                )}
              </button>
              
              <div
                className={`transition-all duration-200 overflow-hidden ${
                  isOpen ? 'max-h-[300px] border-t border-brand-charcoal/10 dark:border-neutral-800' : 'max-h-0'
                }`}
              >
                <div className="p-4 sm:p-5 text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed bg-brand-cream/20 dark:bg-neutral-900/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

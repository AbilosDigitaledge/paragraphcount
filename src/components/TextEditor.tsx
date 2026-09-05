import React, { useRef, useEffect } from 'react';
import { Trash2, FileText, Settings, HelpCircle, Check, Info } from 'lucide-react';

interface TextEditorProps {
  text: string;
  onChangeText: (text: string) => void;
  treatEveryLineAsParagraph: boolean;
  onToggleTreatEveryLine: () => void;
  readingSpeedWpm: number;
  onChangeReadingSpeed: (speed: number) => void;
}

const SAMPLE_TEXT = `In the heart of the digital age, writing remains our primary mode of expressing complex thoughts, documenting software systems, and building professional connections. Yet, we rarely analyze the structural weight of our writing. The length, flow, and density of each paragraph define whether our readers stay engaged or click away.

With ParagraphCount, you get instant visibility into the physical structure of your essays, blog posts, and articles. By displaying word count by paragraph as a first-class metric, this simple utility helps you balance your composition's rhythm. You can immediately identify dense, overwhelming blocks of text and divide them for maximum readability.

No data is ever uploaded to external servers. Because all calculations occur entirely within your browser via optimized JavaScript algorithms, your sensitive drafts remain strictly private. This local-first approach guarantees sub-millisecond response times, even with extremely long texts.

Try editing these paragraphs, adding empty lines, or changing settings below! You'll see overall metrics and paragraph-by-paragraph reports update instantly.`;

export default function TextEditor({
  text,
  onChangeText,
  treatEveryLineAsParagraph,
  onToggleTreatEveryLine,
  readingSpeedWpm,
  onChangeReadingSpeed
}: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the editor on initial load on desktop screens
  useEffect(() => {
    if (window.innerWidth >= 1024 && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleClear = () => {
    onChangeText('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleLoadSample = () => {
    onChangeText(SAMPLE_TEXT);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label
          htmlFor="text-input-workspace"
          className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal dark:text-neutral-200 flex items-center space-x-1.5"
        >
          <span>Text Workspace</span>
          {text.length > 0 && (
            <span className="text-[10px] font-mono font-normal text-neutral-400 dark:text-neutral-500">
              ({text.length.toLocaleString()} chars)
            </span>
          )}
        </label>
        
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleLoadSample}
            className="text-brand-rust dark:text-orange-400 hover:italic hover:text-brand-rust/80 font-bold uppercase tracking-widest text-[10px] flex items-center space-x-1 py-1 transition-all cursor-pointer"
          >
            <span>Load Sample Text</span>
          </button>
          
          {text.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="text-brand-charcoal dark:text-neutral-300 hover:text-brand-rust dark:hover:text-brand-rust hover:italic font-bold uppercase tracking-widest text-[10px] flex items-center space-x-1 py-1 transition-all cursor-pointer"
              aria-label="Clear all text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Workspace</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Box */}
      <div className="relative group">
        <textarea
          id="text-input-workspace"
          ref={textareaRef}
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Paste or type your text here. We'll instantly count the words in each paragraph..."
          className="w-full min-h-[300px] md:min-h-[380px] p-5 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1E1C19] text-brand-charcoal dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-brand-rust dark:focus:border-brand-rust transition-all font-mono text-sm leading-relaxed resize-y"
          spellCheck="true"
        />
        {text.length === 0 && (
          <div className="absolute bottom-5 right-5 text-[10px] uppercase tracking-wider font-bold text-neutral-400 dark:text-neutral-500 pointer-events-none hidden sm:block">
            Start typing to see instant metrics
          </div>
        )}
      </div>

      {/* Settings Panel */}
      <div className="p-4 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-brand-cream/50 dark:bg-[#1E1C19]/40 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Detection Rule */}
        <div className="flex items-start space-x-3">
          <input
            id="setting-treat-every-line"
            type="checkbox"
            checked={treatEveryLineAsParagraph}
            onChange={onToggleTreatEveryLine}
            className="mt-1 w-4 h-4 accent-brand-rust text-brand-rust border-brand-charcoal dark:border-neutral-700 rounded-none cursor-pointer focus:ring-brand-rust"
          />
          <div>
            <label
              htmlFor="setting-treat-every-line"
              className="text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:text-neutral-200 cursor-pointer block"
            >
              Treat every line as a paragraph
            </label>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              By default, paragraphs require blank separation. Toggle this to treat single hard breaks as new paragraphs.
            </p>
          </div>
        </div>

        {/* Reading speed WPM */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="reading-speed-range"
              className="text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:text-neutral-200 flex items-center space-x-1"
            >
              <span>Reading Speed:</span>
              <span className="text-brand-rust dark:text-orange-400 font-mono font-bold ml-1">
                {readingSpeedWpm} WPM
              </span>
            </label>
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 dark:text-neutral-500">
              Avg. Adults: 200 WPM
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <input
              id="reading-speed-range"
              type="range"
              min="100"
              max="400"
              step="10"
              value={readingSpeedWpm}
              onChange={(e) => onChangeReadingSpeed(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-none appearance-none cursor-pointer accent-brand-rust dark:accent-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

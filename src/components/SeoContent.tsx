import React from 'react';
import { AlignLeft, Layout, BookOpen, PenTool, Layers, Activity } from 'lucide-react';

export default function SeoContent() {
  const benefits = [
    {
      title: 'Academic & Essay Writing',
      description: 'Many essays have strict guidelines regarding paragraph weight. For example, introduction and conclusion paragraphs are usually shorter than the body paragraphs. Monitoring word counts per paragraph ensures balanced structural flow.',
      icon: <BookOpen className="w-5 h-5 text-brand-rust" />
    },
    {
      title: 'Blogging & Content Marketing',
      description: 'Online readers scan content quickly. Long, bulky paragraphs can reduce reader retention. Use this tool to isolate paragraphs exceeding 70-80 words, enabling you to break them up for mobile-friendly consumption.',
      icon: <Layout className="w-5 h-5 text-brand-rust" />
    },
    {
      title: 'UX Writing & Content Design',
      description: 'UX copy needs to be punchy and readable. By analyzing character splits and word volumes in copy segments, you can design perfect onboarding, micro-copy, or documentation pages.',
      icon: <PenTool className="w-5 h-5 text-brand-rust" />
    }
  ];

  return (
    <section id="why-count" className="space-y-12 max-w-5xl mx-auto px-4 py-8 border-t border-brand-charcoal dark:border-neutral-800 transition-colors duration-200">
      
      {/* Three Column Benefits Layout (Fully responsive, no nested cards) */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-charcoal dark:text-neutral-50 text-center mb-2 font-display">
          Why Count Words by <span className="font-normal italic text-brand-rust">Paragraph?</span>
        </h2>
        <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400 text-center max-w-2xl mx-auto mb-8">
          Analyzing your text at the paragraph level is one of the fastest ways to improve reading flow and editorial quality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1C1A18] flex flex-col items-start space-y-3"
            >
              <div className="p-2 rounded-none bg-brand-cream dark:bg-neutral-800 text-brand-rust">
                {b.icon}
              </div>
              <h3 className="text-base font-bold text-brand-charcoal dark:text-neutral-100 font-display">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Deep Analysis Explained */}
      <div id="how-it-works" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-brand-cream dark:bg-neutral-900 text-brand-charcoal dark:text-neutral-300 text-[10px] uppercase tracking-widest font-bold">
            <Activity className="w-3.5 h-3.5 text-brand-rust" />
            <span>Under the Hood</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-charcoal dark:text-neutral-50 font-display">
            How Paragraph Detection Works
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Unlike basic calculators that simply count space character boundaries, <strong>ParagraphCount</strong> analyzes paragraphs intelligently by recognizing multi-line spacing configurations.
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-normal">
            <p>
              By default, our engine identifies a paragraph as a block of text separated by <strong>one or more completely blank lines</strong>. This approach successfully guards against treating soft-wrapped text or immediate single line breaks as separate paragraphs.
            </p>
            <p>
              If your text utilizes single carriage breaks (Windows and Unix line terminators) to divide items—such as lists or poetry—you can toggle our **"Treat every line as a paragraph"** option in the workspace settings.
            </p>
          </div>
        </div>

        {/* Word Count vs Character Count block */}
        <div className="p-6 sm:p-8 rounded-none border border-brand-charcoal dark:border-neutral-800 bg-white dark:bg-[#1C1A18] space-y-4">
          <h3 className="text-lg font-bold text-brand-charcoal dark:text-neutral-50 flex items-center space-x-2 font-display">
            <Layers className="w-5 h-5 text-brand-rust" />
            <span>Word Count vs. Character Count</span>
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            <p>
              <strong>Word count</strong> reflects semantic content volume. Our algorithm parses text using a modern Unicode-aware system, supporting accented characters across multiple European languages, and keeping contractions (e.g. <em>don't</em>) intact as single words.
            </p>
            <p>
              <strong>Character count</strong> dictates storage or presentation limits. Social media platforms, metadata editors, and code systems often measure hard character counts. We provide both total counts and character splits excluding whitespaces to help you manage strict constraints.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

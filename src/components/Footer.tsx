import React from 'react';
import { Layers, ShieldAlert, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const relatedTools = [
    { name: 'Word Counter', href: '#tool' },
    { name: 'Character Counter', href: '#tool' },
    { name: 'Sentence Counter', href: '#tool' },
    { name: 'Paragraph Counter', href: '#tool' },
    { name: 'Reading Time Calculator', href: '#tool' }
  ];

  return (
    <footer className="bg-brand-cream/30 dark:bg-[#121110]/60 border-t border-brand-charcoal dark:border-neutral-800 transition-colors duration-200 pt-12 pb-8 px-4 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-brand-charcoal/20 dark:border-neutral-800 text-sm">
        
        {/* Brand column */}
        <div className="space-y-3.5">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-none bg-brand-rust text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-brand-charcoal dark:text-neutral-50 font-display">
              Paragraph<span className="text-brand-rust font-normal italic">Count</span>
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
            ParagraphCount provides immediate structural diagnostics for authors, students, editors, and UX content designers, helping to maintain rhythm and flow.
          </p>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Client-Side. Calculations stay completely private.</span>
          </div>
        </div>

        {/* Network links column */}
        <div>
          <h3 className="text-xs font-bold text-brand-charcoal dark:text-neutral-400 uppercase tracking-widest mb-3.5">
            Text Utility Network
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {relatedTools.map((tool, idx) => (
              <li key={idx}>
                <a
                  href={tool.href}
                  className="text-neutral-600 dark:text-neutral-300 hover:text-brand-rust dark:hover:text-brand-rust hover:italic transition-colors inline-block"
                >
                  {tool.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About / Contact / FAQ column */}
        <div>
          <h3 className="text-xs font-bold text-brand-charcoal dark:text-neutral-400 uppercase tracking-widest mb-3.5">
            About the Project
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
            Designed as a zero-friction, incredibly lightweight browser tool. Perfect for quick copying, structural audits, or formatting spreadsheets.
          </p>
          <div className="text-xs text-neutral-400 space-x-4 mb-4">
            <a href="#faq" className="hover:underline hover:text-brand-rust">FAQ</a>
            <a href="#why-count" className="hover:underline hover:text-brand-rust">Benefits</a>
            <a href="#how-it-works" className="hover:underline hover:text-brand-rust">Methodology</a>
          </div>
          <div className="pt-4 border-t border-brand-charcoal/10 dark:border-neutral-850 text-xs">
            <span className="font-bold text-brand-charcoal dark:text-neutral-300 block mb-0.5">Have questions?</span>
            <a href="mailto:abilosdigitaledge1@gmail.com" className="text-brand-rust hover:underline font-mono">
              abilosdigitaledge1@gmail.com
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
        <div className="uppercase tracking-wider font-semibold text-[10px]">
          &copy; {currentYear} ParagraphCount.com. All rights reserved.
        </div>
        <div className="flex items-center space-x-1 text-[10px] uppercase tracking-wider font-semibold">
          <span>Crafted for high performance & privacy</span>
          <Heart className="w-3.5 h-3.5 text-brand-rust fill-brand-rust" />
        </div>
      </div>
    </footer>
  );
}

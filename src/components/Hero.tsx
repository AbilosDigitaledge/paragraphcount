import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-10 pb-6 text-center max-w-4xl mx-auto px-4">
      <div className="inline-flex items-center space-x-3 mb-6">
        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/70 dark:text-neutral-400">
          The Architecture of Writing
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-rust"></span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-rust">
          Volume 01 / Live Metrics
        </span>
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight text-brand-charcoal dark:text-neutral-50 mb-6 font-display leading-[1.05]">
        Word Count by <br className="hidden sm:inline" />
        <span className="font-normal italic pl-4 text-brand-rust">Paragraph</span>
      </h1>
      
      <p className="text-base sm:text-lg font-display italic text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-6">
        Exploring the density, rhythm, and structural form of text. Paste your manuscript below to analyze individual paragraph statistics in real-time.
      </p>

      <div className="inline-flex items-center justify-center space-x-2 text-[11px] font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 bg-white dark:bg-[#1E1C19] px-4 py-2 border border-emerald-600/40 dark:border-emerald-500/30 rounded-none shadow-sm">
        <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>Your text stays in your browser. Calculations are 100% private & offline.</span>
      </div>
    </section>
  );
}

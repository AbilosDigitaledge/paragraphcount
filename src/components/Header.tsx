import React from 'react';
import { Layers, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="border-b border-brand-charcoal dark:border-neutral-800 bg-brand-cream/90 dark:bg-[#121110]/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-none bg-brand-rust text-white">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-brand-charcoal dark:text-neutral-50 font-display">
              Paragraph<span className="text-brand-rust font-normal italic">Count</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-none border border-brand-charcoal/20 dark:border-neutral-800 text-brand-charcoal/70 dark:text-neutral-400">
              v1.0.0
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-widest font-bold text-brand-charcoal/85 dark:text-neutral-300">
          <a href="#tool" className="hover:text-brand-rust hover:italic transition-all">Analyzer</a>
          <a href="#why-count" className="hover:text-brand-rust hover:italic transition-all">Why Use This?</a>
          <a href="#how-it-works" className="hover:text-brand-rust hover:italic transition-all">How it Works</a>
          <a href="#faq" className="hover:text-brand-rust hover:italic transition-all">FAQ</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-none border border-brand-charcoal dark:border-neutral-800 text-brand-charcoal dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-charcoal" />}
          </button>
          
          <a
            href="#tool"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-none text-white bg-brand-rust hover:bg-brand-rust/90 dark:bg-orange-700 dark:hover:bg-orange-800 transition-all duration-200"
          >
            Start Typing
          </a>
        </div>
      </div>
    </header>
  );
}

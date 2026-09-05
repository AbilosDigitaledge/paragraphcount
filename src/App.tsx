import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsDashboard from './components/StatsDashboard';
import TextEditor from './components/TextEditor';
import ParagraphsList from './components/ParagraphsList';
import SeoContent from './components/SeoContent';
import FaqSection, { FAQ_DATA } from './components/FaqSection';
import Footer from './components/Footer';
import { analyzeDocument } from './utils/textAnalyzer';

export default function App() {
  const [text, setText] = useState<string>('');
  const [treatEveryLineAsParagraph, setTreatEveryLineAsParagraph] = useState<boolean>(() => {
    const saved = localStorage.getItem('pc_treat_every_line');
    return saved === 'true';
  });
  const [readingSpeedWpm, setReadingSpeedWpm] = useState<number>(() => {
    const saved = localStorage.getItem('pc_reading_speed_wpm');
    return saved ? parseInt(saved, 10) : 200;
  });
  
  // Theme State (Dark / Light Mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pc_theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Keep theme preference in local storage and update root DOM element class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pc_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pc_theme', 'light');
    }
  }, [isDarkMode]);

  // Save settings in local storage
  useEffect(() => {
    localStorage.setItem('pc_treat_every_line', String(treatEveryLineAsParagraph));
  }, [treatEveryLineAsParagraph]);

  useEffect(() => {
    localStorage.setItem('pc_reading_speed_wpm', String(readingSpeedWpm));
  }, [readingSpeedWpm]);

  // Perform live structural analysis of text
  const analysis = analyzeDocument(text, treatEveryLineAsParagraph, readingSpeedWpm);

  // JSON-LD Structured Data Schema Generation
  useEffect(() => {
    // Generate WebApplication & FAQPage JSON-LD structures
    const faqSchemaItems = FAQ_DATA.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }));

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": "https://paragraphcount.com/#webapp",
          "name": "ParagraphCount",
          "url": "https://paragraphcount.com/",
          "description": "Count words in each paragraph instantly. Paste your text to see paragraph-by-paragraph word counts, characters, sentences, reading time, and more. Free and private.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://paragraphcount.com/#faq",
          "mainEntity": faqSchemaItems
        }
      ]
    };

    // Inject schema tag into document head
    const existingScript = document.getElementById('pc-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'pc-structured-data';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const tag = document.getElementById('pc-structured-data');
      if (tag) {
        tag.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-[#121110] text-brand-charcoal dark:text-neutral-100 transition-colors duration-200 font-sans selection:bg-brand-rust/30">
      
      {/* Brand Navigation Header */}
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* SEO Header & Landing Information */}
        <Hero />

        {/* Dynamic Tool Workspace Section */}
        <section id="tool" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-20">
          
          {/* Input & Control Panel Workspace (Left Column) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-[#1C1A18] p-6 sm:p-8 border border-brand-charcoal dark:border-neutral-800">
              <TextEditor
                text={text}
                onChangeText={setText}
                treatEveryLineAsParagraph={treatEveryLineAsParagraph}
                onToggleTreatEveryLine={() => setTreatEveryLineAsParagraph(prev => !prev)}
                readingSpeedWpm={readingSpeedWpm}
                onChangeReadingSpeed={setReadingSpeedWpm}
              />
            </div>
          </div>

          {/* Real-time Results & Dashboard Analytics Panel (Right Column) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Document Statistics Dashboard summary */}
            <div className="bg-white dark:bg-[#1C1A18] p-6 sm:p-8 border border-brand-charcoal dark:border-neutral-800">
              <h2 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                Overall Document Analysis
              </h2>
              <StatsDashboard analysis={analysis} />
            </div>

            {/* Paragraph-by-Paragraph Analysis Listing */}
            <div className="bg-white dark:bg-[#1C1A18] p-6 sm:p-8 border border-brand-charcoal dark:border-neutral-800">
              <ParagraphsList
                analysis={analysis}
                rawText={text}
              />
            </div>
          </div>

        </section>

        {/* Educational Content & Context explaining utility value */}
        <SeoContent />

        {/* Structured FAQs Accordion */}
        <FaqSection />

      </main>

      {/* App Footer */}
      <Footer />
    </div>
  );
}

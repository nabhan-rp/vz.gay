import type { MouseEvent } from 'react';
import { UI_COPY, type Language } from '../data/i18n';

interface FooterProps {
  lang: Language;
  onNavigate: (to: string) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const t = UI_COPY[lang].footer;

  const handleRouteClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-slate-200 dark:border-[#232732] bg-white dark:bg-[#101319]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-display font-bold text-slate-900 dark:text-white">vz.gay</span>
            <span aria-hidden="true">·</span>
            <span>{t.rights}</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {t.umbrellaNote}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
          <a
            href="/legal/terms"
            onClick={(e) => handleRouteClick(e, '/legal/terms')}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {t.termsLink}
          </a>
          <a
            href="/legal/privacy"
            onClick={(e) => handleRouteClick(e, '/legal/privacy')}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {t.privacyLink}
          </a>
          <a
            href="/legal/abuse"
            onClick={(e) => handleRouteClick(e, '/legal/abuse')}
            className="text-slate-700 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            {t.abuseLink}
          </a>
          <a
            href="https://myaccount.vz.gay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {t.dashboardLink}
          </a>
          <a
            href="https://support.vz.gay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {t.supportLink}
          </a>
          <a
            href="https://search.vz.gay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {t.searchLink}
          </a>
          <a
            href="https://files.vz.gay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {t.filesLink}
          </a>
          <a
            href="https://jajanserver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {t.sponsorLink}
          </a>
        </div>
      </div>
    </footer>
  );
}
